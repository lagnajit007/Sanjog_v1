
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, Star } from 'lucide-react';
import LessonCard from '@/components/lessons/lesson-card';
import { Camera, CheckCircle, XCircle, ArrowRight, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { HandLandmarker, FilesetResolver, DrawingUtils } from "@mediapipe/tasks-vision";
import { recognizeGesture } from '@/ai/flows/gesture-recognition';


// Mock Data
const userProgress = {
  overallProgress: 45,
  badgeCount: 5,
  xpToNextBadge: 70,
};

const currentLesson = {
  id: 'L3',
  title: 'Essential Questions',
  thumbnail: 'https://picsum.photos/seed/lesson3/300/180',
  description: "Learn to ask 'who,' 'what,' 'where,' 'when,' and 'why.'",
  isUnlocked: true,
};

const allLessons = [
  { id: 'L1', title: 'Alphabet (A-E)', thumbnail: 'https://picsum.photos/seed/lesson1/300/180', category: 'Beginner', progress: 100, xpReward: 50, isUnlocked: true },
  { id: 'L2', title: 'Basic Greetings', thumbnail: 'https://picsum.photos/seed/lesson2/300/180', category: 'Beginner', progress: 100, xpReward: 50, isUnlocked: true },
  { id: 'L3', title: 'Essential Questions', thumbnail: 'https://picsum.photos/seed/lesson3/300/180', category: 'Beginner', progress: 60, xpReward: 75, isUnlocked: true },
  { id: 'L4', title: 'Family Members', thumbnail: 'https://picsum.photos/seed/lesson4/300/180', category: 'Beginner', progress: 0, xpReward: 75, isUnlocked: true },
  { id: 'L5', title: 'Feelings & Emotions', thumbnail: 'https://picsum.photos/seed/lesson5/300/180', category: 'Intermediate', progress: 0, xpReward: 100, isUnlocked: false },
  { id: 'L6', title: 'Restaurant Conversation', thumbnail: 'https://picsum.photos/seed/lesson6/300/180', category: 'Intermediate', progress: 0, xpReward: 120, isUnlocked: false },
  { id: 'L7', title: 'Telling Time', thumbnail: 'https://picsum.photos/seed/lesson7/300/180', category: 'Advanced', progress: 0, xpReward: 150, isUnlocked: false },
  { id: 'L8', title: 'Storytelling Basics', thumbnail: 'https://picsum.photos/seed/lesson8/300/180', category: 'Advanced', progress: 0, xpReward: 200, isUnlocked: false },
];

const recommendedNext = {
  id: 'L4',
  title: 'Family Members',
  thumbnail: 'https://picsum.photos/seed/lesson4/300/180',
};


export default function LearnPage() {
  const beginnerLessons = allLessons.filter(l => l.category === 'Beginner');
  const intermediateLessons = allLessons.filter(l => l.category === 'Intermediate');
  const advancedLessons = allLessons.filter(l => l.category === 'Advanced');
  const specialLessons = allLessons.filter(l => l.category === 'Special Topics');
  const { toast } = useToast();
  const [isCorrect, setIsCorrect] = React.useState<boolean | null>(null);
  const [sessionProgress, setSessionProgress] = React.useState(20);
  const [accuracy, setAccuracy] = React.useState(0);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isWebcamOn, setIsWebcamOn] = React.useState(true);
  const [hasCameraPermission, setHasCameraPermission] = React.useState<boolean | null>(null);
  const [handLandmarker, setHandLandmarker] = useState<HandLandmarker | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const lastPredictionTime = useRef(0);
  const PREDICTION_INTERVAL = 100; // 100ms between predictions

  useEffect(() => {
    const createHandLandmarker = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
        );
        const landmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
            delegate: "GPU",
          },
          runningMode: "VIDEO",
          numHands: 1,
        });
        setHandLandmarker(landmarker);
      } catch (error) {
        console.error("Error creating HandLandmarker:", error);
      }
    };
    createHandLandmarker();
  }, []);

  useEffect(() => {
    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setHasCameraPermission(false);
        toast({
          variant: "destructive",
          title: "Camera Not Supported",
          description: "Your browser does not support camera access.",
        });
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
        setHasCameraPermission(false);
        toast({
          variant: "destructive",
          title: "Camera Access Denied",
          description: "Please enable camera permissions in your browser settings to use this feature.",
        });
      }
    };
    getCameraPermission();
  }, [toast]);
  
  const predictWebcam = async () => {
    if (!handLandmarker || !videoRef.current || !canvasRef.current || !isWebcamOn || videoRef.current.readyState < 3) {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = requestAnimationFrame(predictWebcam);
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext('2d');

    if (canvasCtx) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

      const now = performance.now();
      const results = handLandmarker.detectForVideo(video, now);
      
      const drawingUtils = new DrawingUtils(canvasCtx);
      if (results.landmarks) {
        for (const landmarks of results.landmarks) {
          drawingUtils.drawConnectors(landmarks, HandLandmarker.HAND_CONNECTIONS, { color: '#FFFFFF', lineWidth: 5 });
          drawingUtils.drawLandmarks(landmarks, { color: '#6C4CF1', lineWidth: 2 });
        }
      }

      if (now - lastPredictionTime.current > PREDICTION_INTERVAL) {
        lastPredictionTime.current = now;
        
        if (results.landmarks && results.landmarks.length > 0) {
          const landmarks = results.landmarks[0].flatMap(lm => [lm.x, lm.y]);
          try {
            const response = await recognizeGesture({ landmarks });
            const { prediction, confidence } = response;
            const targetSign = 'A';
            setIsCorrect(prediction === targetSign);
            setAccuracy(Math.round(confidence * 100));

          } catch (error) {
            console.error("Prediction error:", error);
            setIsCorrect(null);
            setAccuracy(0);
          }
        } else {
          setIsCorrect(null);
          setAccuracy(0);
        }
      }
    }

    animationFrameId.current = requestAnimationFrame(predictWebcam);
  };
  
  useEffect(() => {
    if (handLandmarker && isWebcamOn && hasCameraPermission) {
      animationFrameId.current = requestAnimationFrame(predictWebcam);
    } else {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    }
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    }
  }, [handLandmarker, isWebcamOn, hasCameraPermission]);


  const cameraStatusText = hasCameraPermission === false ? "Camera access denied." : (isWebcamOn ? "Analyzing your sign..." : "Webcam is off.");
  const toggleWebcam = () => setIsWebcamOn(prev => !prev);


  return (
    <div className='space-y-6'>
    <Card>
      <CardHeader>
        <CardTitle>Practice</CardTitle>
      </CardHeader>
      <CardContent>
    <div className="grid w-full grid-cols-1 lg:grid-cols-2 lg:grid-rows-1 font-sans p-4 gap-6" style={{ gridTemplateColumns: '1.1fr 1.3fr' }}>
      {/* Left Panel */}
      <Card className="flex flex-col gap-4 rounded-2xl p-6 shadow-lg border-none bg-white">
          <h1 className="text-2xl font-bold text-primary">LETTER 'A'</h1>
          
          <div className="flex justify-center items-center h-[200px] bg-secondary rounded-lg">
             {/* Replace with actual sign image */}
            <Image src="https://picsum.photos/seed/sign-a/300/200" alt="Letter A sign illustration" width={300} height={200} className="rounded-lg object-cover" data-ai-hint="sign language A" />
          </div>

          <p className="text-base text-text-secondary">Make the 'A' sign: form a fist with your thumb resting on the side.</p>
          
          <div className='flex-grow' />

          <div>
              <label htmlFor="session-progress" className="text-sm font-medium text-text-primary">Session Progress</label>
              <Progress value={sessionProgress} indicatorClassName="bg-primary" className="h-2.5 mt-1" />
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
            "relative h-full w-full max-h-[70vh] cursor-pointer overflow-hidden rounded-2xl border-4 object-cover shadow-lg transition-all duration-300 bg-secondary",
            isCorrect === true && "border-success shadow-green-300",
            isCorrect === false && "border-destructive shadow-red-300",
            isCorrect === null && "border-primary"
          )}
          onClick={toggleWebcam}
        >
          <video ref={videoRef} className="h-full w-full object-cover scale-x-[-1]" autoPlay muted playsInline />
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full object-cover scale-x-[-1]" />
          
          { (!isWebcamOn || hasCameraPermission === false) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-white p-4">
              <Camera className="mb-4 h-16 w-16" />
              <p className="text-lg font-semibold">{hasCameraPermission === false ? "Camera access denied" : "Webcam is off"}</p>
              <p className="text-center">{hasCameraPermission === false ? "Please allow camera access in your browser." : "Click to turn on"}</p>
            </div>
          )}

          {isCorrect === true && <CheckCircle className="absolute top-4 right-4 h-10 w-10 text-success animate-subtle-bounce" />}
          {isCorrect === false && <XCircle className="absolute top-4 right-4 h-10 w-10 text-destructive animate-subtle-bounce" />}
        </div>
        
        <p className="font-semibold text-primary text-lg">{accuracy}% Accuracy</p>
        <p className="text-sm text-muted-foreground">{cameraStatusText}</p>
      </div>
    </div>
        <footer className="w-full flex items-center justify-around rounded-2xl bg-white p-4 shadow-lg border-t mt-4">
        <div className="flex items-center gap-3">
          <Target className="h-8 w-8 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Accuracy</p>
            <p className="text-xl font-bold text-primary">{accuracy}%</p>
          </div>
        </div>

        <div className="text-center">
            <p className="text-sm text-muted-foreground">Active Sign</p>
            <p className="text-lg font-bold">A</p>
        </div>

        <div className="text-center">
            <p className="text-sm text-muted-foreground">Next Sign</p>
            <p className="text-lg font-bold">B</p>
        </div>
        
        <div className="w-48">
            <p className="text-sm text-muted-foreground mb-1">XP Gain</p>
            <Progress value={sessionProgress} indicatorClassName="bg-accent-green" className="h-2" />
        </div>
        
        <Button className="rounded-full font-bold text-white bg-primary px-8 py-6 text-lg">
          Next <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </footer>
      </CardContent>
    </Card>
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <CardTitle className="text-2xl font-bold text-primary">Continue Learning</CardTitle>
            <div>
              <p className="text-sm font-medium text-right text-muted-foreground">Overall Progress</p>
              <Progress value={userProgress.overallProgress} className="w-40 h-2 mt-1" indicatorClassName="bg-accent-green" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Card className="overflow-hidden shadow-none border-secondary">
            <CardContent className="p-0">
                <div className="grid md:grid-cols-2">
                    <div className="p-6 flex flex-col justify-center">
                        <h3 className="text-xl font-semibold mb-2">{currentLesson.title}</h3>
                        <p className="text-muted-foreground mb-4">{currentLesson.description}</p>
                        <Button className="w-full md:w-auto">Continue Lesson</Button>
                    </div>
                    <div className="hidden md:block">
                        <Image
                            src={currentLesson.thumbnail}
                            alt={currentLesson.title}
                            width={300}
                            height={180}
                            className="w-full h-full object-cover"
                            data-ai-hint="sign language lesson"
                        />
                    </div>
                </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <Tabs defaultValue="beginner" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 rounded-xl">
          <TabsTrigger value="beginner">Beginner</TabsTrigger>
          <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
          <TabsTrigger value="special">Special Topics</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
            <TabsContent value="beginner">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {beginnerLessons.map(lesson => <LessonCard key={lesson.id} lesson={lesson} />)}
                </div>
            </TabsContent>
            <TabsContent value="intermediate">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {intermediateLessons.map(lesson => <LessonCard key={lesson.id} lesson={lesson} />)}
                </div>
            </TabsContent>
            <TabsContent value="advanced">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {advancedLessons.map(lesson => <LessonCard key={lesson.id} lesson={lesson} />)}
                </div>
            </TabsContent>
            <TabsContent value="special">
                 <div className="text-center p-8 text-muted-foreground">
                    <p>No special topics yet. Check back soon!</p>
                </div>
            </TabsContent>
        </div>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-bold">AI Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <Image
                        src={recommendedNext.thumbnail}
                        alt={recommendedNext.title}
                        width={150}
                        height={90}
                        className="rounded-lg object-cover"
                        data-ai-hint="learning sign language"
                    />
                    <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Recommended Next Lesson</p>
                        <p className="font-semibold text-lg">{recommendedNext.title}</p>
                    </div>
                    <Button>Start Now</Button>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-bold">Milestones & Rewards</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                     <div className="flex items-center gap-3">
                         <Award className="w-6 h-6 text-yellow-500" />
                         <p className="font-medium">Badges Unlocked: {userProgress.badgeCount}</p>
                     </div>
                     <div>
                        <div className="mb-1 flex justify-between">
                            <p className="text-sm font-medium">XP to Next Badge</p>
                            <span className="text-sm font-semibold">{userProgress.xpToNextBadge}%</span>
                        </div>
                        <Progress value={userProgress.xpToNextBadge} indicatorClassName="bg-accent-green" />
                     </div>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
    </div>
  );
}
