'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Camera, CheckCircle, XCircle, Flame, Trophy, RefreshCw, Pause, Play, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { HandLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

const PracticePage = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(true);
  const [isWebcamOn, setIsWebcamOn] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();
  const [handLandmarker, setHandLandmarker] = useState<HandLandmarker | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

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
        toast({ variant: 'destructive', title: 'Camera Access Denied', description: 'Please enable camera permissions in your browser settings.' });
      }
    };

    getCameraPermission();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
    };
  }, [isWebcamOn, handLandmarker, toast]);

  const toggleWebcam = () => setIsWebcamOn(prev => !prev);
  const togglePause = () => setIsPaused(prev => !prev);

  // Mock feedback based on timer
  useEffect(() => {
    if (isPaused || !isWebcamOn) {
      setIsCorrect(null);
      return;
    }
    const interval = setInterval(() => {
      const randomResult = Math.random() > 0.5;
      setIsCorrect(randomResult);
      setTimeout(() => setIsCorrect(null), 1000);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused, isWebcamOn]);

  return (
    <div className="flex h-screen w-full flex-col bg-[#F9F8FF] p-4 font-sans">
      <main className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-2 lg:grid-rows-1">
        {/* Left Panel */}
        <div className="flex flex-col gap-4 rounded-lg p-4">
          <h1 className="text-2xl font-bold text-[#1E1E1E]">Today's Practice: Greetings & Basics</h1>
          <p className="text-base text-[#555]">Follow the instructions and show the correct sign on your webcam.</p>
          
          <Card className="border-none bg-[#E7E1FF] p-4 text-center shadow-md">
            <p className="text-sm font-semibold text-[#6C4CF1]/80">Active Sign</p>
            <p className="text-2xl font-bold text-[#6C4CF1]">HELLO 👋</p>
          </Card>

          <Card className="border-none bg-[#FFF7E0] p-4 text-center shadow-md">
            <p className="text-sm font-semibold text-[#F1A200]/80">Next Sign</p>
            <p className="text-xl font-bold text-[#F1A200]">THANK YOU 🙏</p>
          </Card>
          
          <div className="mt-auto space-y-4">
            <div>
              <label htmlFor="accuracy" className="text-sm font-medium text-[#333]">Accuracy</label>
              <Progress value={75} indicatorClassName="bg-[#6C4CF1]" className="h-2.5" />
              <p className="mt-1 text-right text-sm font-semibold text-[#333]">75%</p>
            </div>
            <hr className="border-t border-gray-200" />
            <div className="flex items-center justify-around">
              <div className="flex items-center gap-2">
                <Flame className="h-6 w-6 text-[#FF6C3E]" />
                <span className="font-bold text-[#FF6C3E]">Streak: 7 Days</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="h-6 w-6 text-[#6C4CF1]" />
                <span className="font-bold text-[#6C4CF1]">XP: 1250</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex flex-col items-center justify-center gap-4">
          <div
            className={cn(
              "relative h-full w-full cursor-pointer overflow-hidden rounded-2xl border-4 object-cover shadow-lg transition-all duration-300",
              isCorrect === true && "border-success shadow-green-300",
              isCorrect === false && "border-destructive shadow-red-300"
            )}
            onClick={toggleWebcam}
          >
            <video ref={videoRef} className="h-full w-full scale-x-[-1]" autoPlay muted playsInline />
            {!isWebcamOn && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-white">
                <Camera className="mb-4 h-16 w-16" />
                <p className="text-lg font-semibold">Webcam is off</p>
                <p>Click to turn on</p>
              </div>
            )}
            {isCorrect === true && <CheckCircle className="absolute top-4 right-4 h-10 w-10 text-success animate-subtle-bounce" />}
            {isCorrect === false && <XCircle className="absolute top-4 right-4 h-10 w-10 text-destructive animate-subtle-bounce" />}
          </div>
          <div className="flex items-center gap-3">
             <Image src="/ai-buddy.png" alt="AI Buddy" width={60} height={60} className="animate-subtle-bounce" />
             <p className="rounded-full bg-white px-4 py-2 font-semibold text-[#333] shadow-md">
                {isCorrect === true ? "Great job! Try the next one!" : "Nice try! Let's do it again."}
            </p>
          </div>
        </div>
      </main>

      {/* Bottom Panel */}
      <footer className="mt-4 flex items-center justify-between rounded-full bg-white p-3 shadow-lg">
        <Button variant="secondary" className="rounded-full font-bold" style={{ backgroundColor: '#E7E1FF', color: '#6C4CF1' }}>
          <RefreshCw className="mr-2 h-5 w-5" /> Repeat Sign
        </Button>
        <Button onClick={togglePause} variant="secondary" className="rounded-full font-bold" style={{ backgroundColor: '#FFF7E0', color: '#F1A200' }}>
          {isPaused ? <Play className="mr-2 h-5 w-5" /> : <Pause className="mr-2 h-5 w-5" />} {isPaused ? 'Resume' : 'Pause'}
        </Button>
        <Button className="rounded-full font-bold text-white" style={{ backgroundColor: '#6C4CF1' }}>
          Next Step <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </footer>
    </div>
  );
};

export default PracticePage;
