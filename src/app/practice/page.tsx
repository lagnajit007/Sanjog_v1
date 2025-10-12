
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Camera, CheckCircle, XCircle, RefreshCw, Pause, Play, ArrowRight, Target } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { HandLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const PracticePage = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isWebcamOn, setIsWebcamOn] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();
  const [handLandmarker, setHandLandmarker] = useState<HandLandmarker | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [sessionProgress, setSessionProgress] = useState(20);
  const [accuracy, setAccuracy] = useState(87);

  // Initialize Hand Landmarker
  useEffect(() => {
    async function createHandLandmarker() {
      try {
        const vision = await FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm');
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
        toast({ variant: 'destructive', title: 'Hand Tracking Error', description: 'Could not initialize hand tracking model.' });
      }
    }
    createHandLandmarker();
  }, [toast]);

  // Handle Webcam and Permissions
  useEffect(() => {
    if (!isWebcamOn || !handLandmarker) {
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      return;
    }

    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this app.',
        });
      }
    };

    getCameraPermission();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
    };
  }, [isWebcamOn, handLandmarker, toast]);


  // Mock feedback based on timer
  useEffect(() => {
    if (isPaused || !isWebcamOn || !hasCameraPermission) {
      setIsCorrect(null);
      return;
    }
    const interval = setInterval(() => {
      const randomResult = Math.random() > 0.5;
      setIsCorrect(randomResult);
      if(randomResult) {
        setAccuracy(prev => Math.min(prev + 5, 100));
        setSessionProgress(prev => Math.min(prev + 10, 100));
      } else {
        setAccuracy(prev => Math.max(prev - 3, 0));
      }
      setTimeout(() => setIsCorrect(null), 1500);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused, isWebcamOn, hasCameraPermission]);

  const toggleWebcam = () => setIsWebcamOn(prev => !prev);
  const togglePause = () => setIsPaused(prev => !prev);

  const cameraStatusText = hasCameraPermission === false ? "Camera access denied." : (isWebcamOn ? "Analyzing your sign..." : "Webcam is off.");

  return (
    <div className="grid h-screen w-full grid-cols-1 lg:grid-cols-2 lg:grid-rows-1 bg-[#F9F8FF] font-sans p-4 gap-6" style={{ gridTemplateColumns: '1.1fr 1.3fr' }}>
      {/* Left Panel */}
      <Card className="flex flex-col gap-4 rounded-2xl p-6 shadow-lg border-none bg-white">
          <h1 className="text-2xl font-bold text-[#6C4CF1]">HELLO 👋</h1>
          
          <div className="flex justify-center items-center h-[200px] bg-secondary rounded-lg">
             {/* Replace with actual sign image */}
            <Image src="https://picsum.photos/seed/hello-sign/300/200" alt="Hello sign illustration" width={300} height={200} className="rounded-lg object-cover" data-ai-hint="sign language hello" />
          </div>

          <p className="text-base text-[#555]">Make the 'Hello' sign: place your flat hand to your forehead, then move it outwards and away.</p>
          
          <div className='flex-grow' />

          <div>
              <label htmlFor="session-progress" className="text-sm font-medium text-[#333]">Session Progress</label>
              <Progress value={sessionProgress} indicatorClassName="bg-[#6C4CF1]" className="h-2.5 mt-1" />
          </div>

          <div className="flex items-center justify-between gap-4">
              <Button variant="outline" className="w-full">Show Hint</Button>
              <Button className="w-full bg-primary text-white">Next Step <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </div>
          
          <p className="text-center font-semibold text-accent-green h-6">
            {isCorrect === true ? "Excellent!" : isCorrect === false ? "Try that one more time." : ""}
          </p>
      </Card>

      {/* Right Panel */}
      <div className="flex flex-col items-center justify-center gap-4">
        <div
          className={cn(
            "relative h-full w-full max-h-[70vh] cursor-pointer overflow-hidden rounded-2xl border-4 object-cover shadow-lg transition-all duration-300 bg-[#F3F2FF]",
            isCorrect === true && "border-success shadow-green-300",
            isCorrect === false && "border-destructive shadow-red-300",
            isCorrect === null && "border-primary"
          )}
          onClick={toggleWebcam}
        >
          <video ref={videoRef} className="h-full w-full scale-x-[-1]" autoPlay muted playsInline />
          
          { (!isWebcamOn || hasCameraPermission === false) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-white p-4">
              <Camera className="mb-4 h-16 w-16" />
              <p className="text-lg font-semibold">{isWebcamOn ? "Camera permission needed" : "Webcam is off"}</p>
              <p className="text-center">{isWebcamOn ? "Please allow camera access in your browser." : "Click to turn on"}</p>
            </div>
          )}

          {isCorrect === true && <CheckCircle className="absolute top-4 right-4 h-10 w-10 text-success animate-subtle-bounce" />}
          {isCorrect === false && <XCircle className="absolute top-4 right-4 h-10 w-10 text-destructive animate-subtle-bounce" />}
        </div>
        
        <p className="font-semibold text-primary text-lg">{accuracy}% Accuracy</p>
        <p className="text-sm text-muted-foreground">{cameraStatusText}</p>
      </div>

      {/* Bottom Panel */}
      <footer className="fixed bottom-0 left-0 right-0 h-[100px] flex items-center justify-around rounded-t-2xl bg-white p-4 shadow-lg border-t">
        <div className="flex items-center gap-3">
          <Target className="h-8 w-8 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Accuracy</p>
            <p className="text-xl font-bold text-primary">{accuracy}%</p>
          </div>
        </div>

        <div className="text-center">
            <p className="text-sm text-muted-foreground">Active Sign</p>
            <p className="text-lg font-bold">HELLO</p>
        </div>

        <div className="text-center">
            <p className="text-sm text-muted-foreground">Next Sign</p>
            <p className="text-lg font-bold">THANK YOU</p>
        </div>
        
        <div className="w-48">
            <p className="text-sm text-muted-foreground mb-1">XP Gain</p>
            <Progress value={sessionProgress} indicatorClassName="bg-accent-green" className="h-2" />
        </div>
        
        <Button className="rounded-full font-bold text-white bg-primary px-8 py-6 text-lg">
          Next <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </footer>
    </div>
  );
};

export default PracticePage;

    