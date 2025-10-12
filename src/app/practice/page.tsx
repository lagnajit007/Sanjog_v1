'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Camera, CheckCircle, XCircle } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/dashboard-layout';
import { HandLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

const lessons = [
  { sign: 'A', video: '/videos/asl_A.mp4' },
  { sign: 'B', video: '/videos/asl_B.mp4' },
  { sign: 'C', video: '/videos/asl_C.mp4' },
];

export default function PracticePage() {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();
  const [currentLesson, setCurrentLesson] = useState(0);
  const [handLandmarker, setHandLandmarker] = useState<HandLandmarker | null>(null);
  const lastVideoTimeRef = useRef(-1);
  const requestRef = useRef(0);

  useEffect(() => {
    async function createHandLandmarker() {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm'
        );
        const landmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
            delegate: 'GPU',
          },
          runningMode: 'VIDEO',
          numHands: 1,
        });
        setHandLandmarker(landmarker);
      } catch (error) {
        console.error('Error creating HandLandmarker:', error);
        toast({
          variant: 'destructive',
          title: 'Hand Tracking Error',
          description: 'Could not initialize hand tracking model.',
        });
      }
    }
    createHandLandmarker();
  }, [toast]);

  const predictWebcam = () => {
    if (!videoRef.current || !handLandmarker) {
      return;
    }

    const video = videoRef.current;
    if (video.currentTime !== lastVideoTimeRef.current) {
      lastVideoTimeRef.current = video.currentTime;
      const results = handLandmarker.detectForVideo(video, Date.now());
      // For now, we'll just log the results. We will use this data for feedback later.
      if (results.landmarks && results.landmarks.length > 0) {
        console.log(results.landmarks[0]);
      }
    }

    requestRef.current = requestAnimationFrame(predictWebcam);
  };

  useEffect(() => {
    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        toast({
          variant: 'destructive',
          title: 'Camera Not Supported',
          description: 'Your browser does not support camera access.',
        });
        setHasCameraPermission(false);
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.addEventListener('loadeddata', () => {
             requestRef.current = requestAnimationFrame(predictWebcam);
          });
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this feature.',
        });
      }
    };

    if (handLandmarker) {
      getCameraPermission();
    }

    return () => {
      cancelAnimationFrame(requestRef.current);
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [toast, handLandmarker]);

  const handleNextLesson = () => {
    setCurrentLesson((prev) => (prev + 1) % lessons.length);
  };

  return (
    <DashboardLayout>
      <div className="flex h-full flex-col lg:flex-row gap-8 p-4 md:p-8">
        <div className="flex-1 flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Live Practice</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
                <video ref={videoRef} className="h-full w-full object-cover" autoPlay muted playsInline style={{ transform: 'scaleX(-1)' }} />
                {hasCameraPermission === false && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white">
                    <Camera className="h-12 w-12 mb-4" />
                    <p className="text-lg font-semibold">Camera access is required</p>
                    <p>Please allow camera access in your browser settings.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:w-96 flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Lesson: Sign "{lessons[currentLesson].sign}"</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Watch the example and try to replicate the sign. Our AI will give you live feedback.
              </p>
              <div className="aspect-video w-full overflow-hidden rounded-lg border bg-muted">
                {/* Example video will go here */}
                <div className="flex h-full items-center justify-center">
                  <p>Example Video Placeholder</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Live Feedback</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-4">
              <XCircle className="h-16 w-16 text-destructive" />
              <p className="font-semibold text-lg">Keep Trying!</p>
              <p className="text-center text-muted-foreground text-sm">
                Make sure your thumb is pointing straight up.
              </p>
            </CardContent>
          </Card>
          <Button onClick={handleNextLesson} size="lg">Next Lesson</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
