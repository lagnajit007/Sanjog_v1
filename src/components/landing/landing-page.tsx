

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Award, ArrowRight, BookOpen, Check, CheckCircle, Crown, Gamepad2, GraduationCap, Lightbulb, PenTool, User, Users, Video, Bot, MessageCircle, Share2, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import AuthModal from '@/components/auth/auth-modal';
import { useUser } from '@/firebase';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';

const CreativeActivitiesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 8V12M12 12V16M12 12H16M12 12H8" stroke="#7B61FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.5 12C18.5 13.9655 18.0051 15.8239 17.1375 17.391C16.2699 18.9581 15.071 20.157 13.6822 20.8528C12.2934 21.5486 10.7719 21.713 9.29616 21.3259C7.82041 20.9387 6.46747 20.0223 5.42173 18.721C4.37599 17.4197 3.69931 15.8113 3.48679 14.1221C3.27426 12.433 3.53526 10.7455 4.23896 9.24751C4.94265 7.74952 6.05943 6.51263 7.44754 5.68888C8.83566 4.86514 10.4373 4.5 12 4.5" stroke="#7B61FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Logo = () => (
    <Link href="/" className="flex items-center gap-2">
      <svg width="108" height="25" viewBox="0 0 108 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.05 13.5C21.05 18.5 17.05 22.5 12.05 22.5C7.05001 22.5 3.05001 18.5 3.05001 13.5C3.05001 8.5 7.05001 4.5 12.05 4.5C14.55 4.5 16.85 5.5 18.55 7.2" stroke="#252525" strokeWidth="4" strokeLinecap="round"/>
        <path d="M3.05001 11.5C3.05001 6.5 7.05001 2.5 12.05 2.5C17.05 2.5 21.05 6.5 21.05 11.5" stroke="#252525" strokeWidth="4" strokeLinecap="round"/>
        <path d="M30.04 11.9V19.4H33.54V15.2L37.14 19.4H41.44L37.14 14.2C39.24 13.6 40.24 12.2 40.24 10.3C40.24 7.7 38.34 6.4 35.24 6.4H30.04V11.9ZM33.54 8.7C34.64 8.7 35.74 9.1 35.74 10.3C35.74 11.4 34.74 12.1 33.54 12.1V8.7Z" fill="#252525"/>
        <path d="M42.36 6.69V19.4H45.86V6.69H42.36Z" fill="#252525"/>
        <path d="M54.18 6.4C50.38 6.4 47.58 8.9 47.58 12.9C47.58 16.9 50.38 19.5 54.18 19.5C57.98 19.5 60.78 16.9 60.78 12.9C60.78 8.9 57.98 6.4 54.18 6.4ZM54.18 17.2C52.28 17.2 51.08 15.6 51.08 12.9C51.08 10.2 52.28 8.7 54.18 8.7C56.08 8.7 57.28 10.2 57.28 12.9C57.28 15.6 56.08 17.2 54.18 17.2Z" fill="#252525"/>
        <path d="M72.03 14.5C72.33 16.2 73.83 17.3 75.63 17.3C77.03 17.3 78.03 16.6 78.03 15.7C78.03 14.6 77.23 14.1 75.93 13.7L73.93 13.1C71.33 12.4 70.03 11 70.03 8.9C70.03 6.8 71.83 5.4 74.63 5.4C77.43 5.4 79.13 6.7 79.53 8.8H76.03C75.83 7.8 75.13 7.2 74.53 7.2C73.83 7.2 73.43 7.6 73.43 8.3C73.43 9.1 73.93 9.5 75.13 9.9L77.13 10.5C80.03 11.3 81.43 12.7 81.43 15.2C81.43 17.9 79.23 19.5 75.63 19.5C72.13 19.5 69.83 17.6 69.43 14.5H72.03Z" fill="#252525"/>
        <path d="M91.82 19.5C95.62 19.5 98.42 17 98.42 13C98.42 9 95.62 6.5 91.82 6.5C88.02 6.5 85.22 9 85.22 13C85.22 17 88.02 19.5 91.82 19.5ZM91.82 8.8C93.72 8.8 94.92 10.3 94.92 13C94.92 15.7 93.72 17.2 91.82 17.2C89.92 17.2 88.72 15.7 88.72 13C88.72 10.3 89.92 8.8 91.82 8.8Z" fill="#252525"/>
        <path d="M106.66 11.3C106.66 15.7 104.26 19.5 99.86 19.5V17.3C102.86 17.3 104.46 14.7 104.46 11.9V6.7H100.36V14.1C100.36 15.6 99.66 16.5 98.56 16.5C97.16 16.5 96.66 15.4 96.66 14V6.7H93.16V14.4C93.16 17.3 94.86 18.6 96.96 18.6C98.46 18.6 99.66 18.1 100.46 17.2L100.96 19.3H102.86C102.06 18 101.56 16.2 101.56 14.4V11.3H106.66Z" fill="#252525"/>
        <path d="M64.79 6.69V19.4H68.29V9.4C68.29 8 68.99 7.2 70.39 7.2C70.69 7.2 70.99 7.2 71.19 7.3V19.4H74.69V7.3C74.89 7.2 75.19 7.2 75.49 7.2C76.89 7.2 77.59 8 77.59 9.4V19.4H81.09V6.69H78.09C77.09 6.69 76.09 6.99 75.29 7.69C74.69 6.99 73.59 6.69 72.39 6.69C71.09 6.69 70.09 7.09 69.39 7.99C68.69 7.29 67.69 6.69 66.29 6.69H64.79Z" fill="#252525"/>
        <path d="M64.84 5.2C64.84 5.75228 64.3923 6.2 63.84 6.2C63.2877 6.2 62.84 5.75228 62.84 5.2C62.84 4.64772 63.2877 4.2 63.84 4.2C64.3923 4.2 64.84 4.64772 64.84 5.2Z" fill="#7B61FF"/>
      </svg>
    </Link>
);


const LandingPage = () => {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');
  const [isAnnual, setIsAnnual] = useState(false);
  
  const heroAvatars = [
    PlaceHolderImages.find((img) => img.id === '1'),
    PlaceHolderImages.find((img) => img.id === '2'),
    PlaceHolderImages.find((img) => img.id === '3'),
  ];
  
  const missionImage = PlaceHolderImages.find((img) => img.id === 'mission');
  const processImage = PlaceHolderImages.find((img) => img.id === 'process');
  const ctaHandsImage = PlaceHolderImages.find((img) => img.id === 'cta-hands');
  const videoPreviewImage = PlaceHolderImages.find((img) => img.id === 'video-preview');
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero');

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isUserLoading, router]);

  const openAuthModal = (view: 'login' | 'signup') => {
    setAuthView(view);
    setIsAuthModalOpen(true);
  };
  
  const pricingPlans = {
    monthly: [
      {
        title: 'Starter',
        for: 'For Casual Learners',
        price: 'Free',
        icon: <User className="h-8 w-8 text-primary" />,
        description: 'Get a taste of sign language with our introductory lessons and quizzes.',
        features: ['Access to fun quizzes', 'Limited creative activities', 'Community access', '24/7 chatbot support'],
        isPopular: false,
      },
      {
        title: 'Pro',
        for: 'For Dedicated Learners',
        price: '₹499',
        period: '/monthly',
        icon: <Video className="h-8 w-8 text-primary" />,
        description: 'Unlock our full potential with unlimited access and progress tracking.',
        features: ['Everything in Starter', 'Unlimited access to all activities', 'Progress tracking dashboard', 'Priority support'],
        isPopular: true,
      },
      {
        title: 'Enterprise',
        for: 'For Organizations',
        price: 'Custom',
        icon: <Users className="h-8 w-8 text-primary" />,
        description: 'Custom solutions for schools, businesses, and large groups.',
        features: ['All Pro features', 'Unlimited sign translation access', 'Dedicated mentor support', 'Onboarding & training'],
        isPopular: false,
      },
    ],
    annually: [
        {
        title: 'Starter',
        for: 'For Casual Learners',
        price: 'Free',
        icon: <User className="h-8 w-8 text-primary" />,
        description: 'Get a taste of sign language with our introductory lessons and quizzes.',
        features: ['Access to fun quizzes', 'Limited creative activities', 'Community access', '24/7 chatbot support'],
        isPopular: false,
      },
      {
        title: 'Pro',
        for: 'For Dedicated Learners',
        price: '₹4990',
        period: '/annually',
        icon: <Video className="h-8 w-8 text-primary" />,
        description: 'Unlock our full potential with unlimited access and progress tracking.',
        features: ['Everything in Starter', 'Unlimited access to all activities', 'Progress tracking dashboard', 'Priority support'],
        isPopular: true,
      },
      {
        title: 'Enterprise',
        for: 'For Organizations',
        price: 'Custom',
        icon: <Users className="h-8 w-8 text-primary" />,
        description: 'Custom solutions for schools, businesses, and large groups.',
        features: ['All Pro features', 'Unlimited sign translation access', 'Dedicated mentor support', 'Onboarding & training'],
        isPopular: false,
      },
    ]
  };

  const plansToShow = isAnnual ? pricingPlans.annually : pricingPlans.monthly;


  return (
    <div className="bg-background text-textPrimary font-body">
      <header className="sticky top-0 z-50 bg-surface border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Logo />
            <nav className="hidden items-center gap-6 md:flex">
              <Link href="#home" className="text-sm font-medium text-textSecondary hover:text-primary">Home</Link>
              <Link href="#features" className="text-sm font-medium text-textSecondary hover:text-primary">Features</Link>
              <Link href="#community" className="text-sm font-medium text-textSecondary hover:text-primary">Community</Link>
              <Link href="#pricing" className="text-sm font-medium text-textSecondary hover:text-primary">Pricing</Link>
              <Link href="#about" className="text-sm font-medium text-textSecondary hover:text-primary">About</Link>
            </nav>
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => openAuthModal('login')}>Log in</Button>
              <Button onClick={() => openAuthModal('signup')}>Sign up</Button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="py-16 text-center md:py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-headline font-bold tracking-tight text-textPrimary md:text-6xl">
              Learn Sign Language, The Fun and Easy Way
            </h1>
            <p className="mt-6 text-lg text-textSecondary max-w-2xl mx-auto">
              Discover thousands of fun and interactive learning activities to support your sign language journey and track your progress.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" onClick={() => openAuthModal('signup')}>
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </div>
            <div className="mt-8 flex items-center justify-center">
              <div className="flex -space-x-2">
                {heroAvatars.map((avatar, index) => avatar && (
                  <Avatar key={index} className="h-10 w-10 border-2 border-white">
                    <AvatarImage src={avatar.imageUrl} alt={`Learner ${index + 1}`} data-ai-hint={avatar.imageHint} />
                    <AvatarFallback>{`L${index + 1}`}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <p className="ml-4 text-sm font-medium text-textSecondary">+10k Learners Joined</p>
            </div>
          </div>
          <div className="mt-12">
            {heroImage && 
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                width={1200}
                height={600}
                className="rounded-lg shadow-lg"
                data-ai-hint={heroImage.imageHint}
              />
            }
          </div>
        </section>

        {/* Feature Video Section */}
        <section id="features" className="bg-surface py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div >
                {videoPreviewImage && (
                  <Image
                    src={videoPreviewImage.imageUrl}
                    alt={videoPreviewImage.description}
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg"
                    data-ai-hint={videoPreviewImage.imageHint}
                  />
                )}
              </div>
              <div>
                <h2 className="text-3xl font-headline font-bold md:text-4xl">
                  Simplify Your Video Translation Today
                </h2>
                <p className="mt-4 text-textSecondary max-w-xl">
                  Instantly translate your videos to sign language with AI. Sanjog bridges accessibility gaps for the deaf and hard-of-hearing community, making content accessible to profoundly Deaf people worldwide.
                </p>
                <div className="mt-6">
                  <Button
                    className="bg-primary text-primary-foreground"
                    onClick={() => openAuthModal('signup')}
                  >
                    Try for Free <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Features Section */}
        <section className="bg-background py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <span className="inline-block bg-secondary text-primary text-sm font-semibold px-4 py-1.5 rounded-full">INTERACTIVE FEATURES</span>
                    <p className="mt-2 text-3xl md:text-4xl font-headline font-bold text-textPrimary max-w-2xl mx-auto">
                        Features That Make Learning Fun
                    </p>
                     <p className="mt-4 text-lg text-textSecondary max-w-2xl mx-auto">
                        Our platform is designed to be engaging and effective, with features that cater to all learning styles.
                    </p>
                </div>
                <div className="mt-12 grid gap-8 md:grid-cols-3">
                    <Card className="bg-card p-6 text-center border shadow-sm">
                        <div className="mb-4 inline-block rounded-full bg-secondary p-3">
                            <GraduationCap className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle className="mt-4 text-xl font-bold">Fun Quizzes</CardTitle>
                        <CardContent className="p-0 mt-2">
                            <p className="text-textSecondary">Test your knowledge with interactive quizzes and challenges.</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-card p-6 text-center border shadow-sm">
                         <div className="mb-4 inline-block rounded-full bg-secondary p-3">
                           <BrainCircuit className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle className="mt-4 text-xl font-bold">AI-Powered Feedback</CardTitle>
                        <CardContent className="p-0 mt-2">
                            <p className="text-textSecondary">Get real-time feedback on your signing from our smart AI tutor.</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-card p-6 text-center border shadow-sm">
                        <div className="mb-4 inline-block rounded-full bg-secondary p-3">
                           <Gamepad2 className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle className="mt-4 text-xl font-bold">Learn with Games</CardTitle>
                        <CardContent className="p-0 mt-2">
                            <p className="text-textSecondary">Play engaging games that make practicing sign language a joy.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

        {/* Community Section */}
        <section id="community" className="bg-surface text-textPrimary py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block bg-secondary text-primary text-sm font-semibold px-4 py-1.5 rounded-full">Community</span>
            <h2 className="text-3xl font-headline font-bold mt-4 md:text-4xl">
              Join a Thriving Learning Community
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-textSecondary">
              Sanjog connects you with millions of learners and expert mentors, providing the guidance and resources needed to excel in your journey.
            </p>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
              <Card className="bg-card border text-center py-6">
                <div className="mb-4 inline-flex items-center justify-center rounded-full bg-secondary p-3">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <p className="text-4xl font-bold text-textPrimary">2.5M+</p>
                <p className="mt-2 text-textSecondary">Engaged Learners</p>
              </Card>
              <Card className="bg-card border text-center py-6">
                <div className="mb-4 inline-flex items-center justify-center rounded-full bg-secondary p-3">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <p className="text-4xl font-bold text-textPrimary">5K+</p>
                <p className="mt-2 text-textSecondary">Courses Available</p>
              </Card>
              <Card className="bg-card border text-center py-6">
                <div className="mb-4 inline-flex items-center justify-center rounded-full bg-secondary p-3">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <p className="text-4xl font-bold text-textPrimary">800+</p>
                <p className="mt-2 text-textSecondary">Expert Mentors</p>
              </Card>
            </div>
            <div className="mt-12">
                <Button size="lg" onClick={() => openAuthModal('signup')}>Join The Community</Button>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section id="about" className="py-16 md:py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-secondary text-primary text-sm font-semibold px-4 py-1.5 rounded-full uppercase">Our Mission</span>
             <p className="mt-2 text-3xl md:text-4xl font-headline font-bold text-textPrimary max-w-2xl mx-auto">
                Making Communication Accessible for All
            </p>
            <p className="mt-4 text-lg text-textSecondary max-w-3xl mx-auto">
                Our real-time sign language translation platform is designed to break down communication barriers instantly, empowering the Deaf and hard-of-hearing community worldwide.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                  <h3 className="text-2xl font-bold leading-tight mb-4">
                      Bridging Gaps with Technology
                  </h3>
                  <p className="text-textSecondary mb-8 ">
                    At Sanjog, we leverage cutting-edge AI to provide seamless translation, creating a more inclusive world. We believe that everyone deserves to be understood, and our mission is to make that a reality.
                  </p>
                  <Button variant="outline">Learn More About Us</Button>
              </div>
              <div>
                  {missionImage && (
                      <Image
                        src={missionImage.imageUrl}
                        alt={missionImage.description}
                        width={600}
                        height={400}
                        className="rounded-2xl shadow-lg object-cover w-full h-full"
                        data-ai-hint={missionImage.imageHint}
                      />
                  )}
              </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="bg-surface py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <span className="inline-block bg-secondary text-primary text-sm font-semibold px-4 py-1.5 rounded-full uppercase mb-2">Our Process</span>
                 <p className="text-3xl md:text-4xl font-headline font-bold text-textPrimary max-w-md">How Our AI Works Its Magic</p>
                <ul className="space-y-8 mt-8">
                  <li className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-secondary">
                      <Share2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Large Sign Language Datasets</h3>
                      <p className="text-textSecondary mt-1">We train our AI on vast and diverse datasets of sign language to ensure accuracy.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-secondary">
                      <BrainCircuit className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">AI-Powered Video Blending</h3>
                       <p className="text-textSecondary mt-1">Our technology intelligently blends signs to create fluid, natural-looking translations.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-secondary">
                      <Video className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Real-Time Learning & Feedback</h3>
                       <p className="text-textSecondary mt-1">Practice your signs and get instant feedback from our AI to improve your skills.</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div >
              {processImage && (
                <Image
                  src={processImage.imageUrl}
                  alt={processImage.description}
                  width={600}
                  height={600}
                  className="rounded-lg shadow-lg"
                  data-ai-hint={processImage.imageHint}
                />
              )}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="text-textPrimary py-16 md:py-24 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="inline-block bg-secondary text-primary text-sm font-semibold px-4 py-1.5 rounded-full">Pricing</span>
              <h2 className="text-3xl font-headline font-bold mt-4 md:text-4xl">Our Pricing Plans</h2>
              <p className="mx-auto mt-4 max-w-2xl text-textSecondary">
                Choose the plan that's right for you and start your sign language journey today.
              </p>
              <div className="mt-8 flex justify-center items-center gap-4">
                <Label htmlFor="pricing-toggle" className={cn(!isAnnual && "text-primary")}>Monthly</Label>
                <Switch id="pricing-toggle" checked={isAnnual} onCheckedChange={setIsAnnual} />
                <Label htmlFor="pricing-toggle" className={cn(isAnnual && "text-primary")}>Annually (Save 20%)</Label>
              </div>
            </div>
            
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 items-center gap-8">
              {plansToShow.map((plan, index) => (
                <Card 
                  key={index}
                  className={cn(
                    "rounded-2xl p-8 h-full flex flex-col border",
                    plan.isPopular 
                      ? 'bg-primary text-white relative shadow-2xl shadow-primary/30 scale-105'
                      : 'bg-card text-card-foreground'
                  )}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-3 right-8 bg-accent text-accent-foreground text-sm font-semibold px-4 py-1 rounded-full">Popular</div>
                  )}
                  <div className="flex items-center gap-4 mb-4">
                      <div className={cn("w-16 h-16 rounded-lg flex items-center justify-center", plan.isPopular ? "bg-white/20" : "bg-secondary")}>
                          {plan.icon}
                      </div>
                      <div>
                          <p className={cn("text-sm", plan.isPopular ? "text-white/80" : "text-muted-foreground")}>{plan.for}</p>
                          <p className="text-2xl font-bold">{plan.title}</p>
                      </div>
                  </div>
                  <p className={cn("text-sm mb-6 flex-grow", plan.isPopular ? "text-white/70" : "text-muted-foreground")}>{plan.description}</p>
                  
                  <div className="mb-8">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    {plan.period && <span className={cn("text-sm", plan.isPopular ? "text-white/70" : "text-muted-foreground")}>{plan.period}</span>}
                  </div>

                  <div className="flex-grow">
                      <p className="font-semibold mb-4">What's included</p>
                      <ul className="space-y-3">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <div className={cn("w-6 h-6 rounded-full flex items-center justify-center shrink-0", plan.isPopular ? "bg-white/20" : "bg-secondary")}>
                                <Check className="h-4 w-4" />
                            </div>
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                  </div>
                  
                  <Button 
                    className={cn(
                      "w-full mt-8 rounded-full py-6 text-lg font-semibold",
                      plan.isPopular ? 'bg-white text-primary hover:bg-gray-100' : ''
                    )}
                    variant={plan.isPopular ? 'default' : 'outline'}
                    onClick={() => openAuthModal('signup')}
                  >
                    Get started
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-surface">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 rounded-2xl bg-primary text-primary-foreground p-8 md:p-12">
              <div>
                <h2 className="text-3xl font-headline font-bold">
                  Start Learning Today
                </h2>
                <p className="mt-4 text-primary-foreground/80 max-w-md">
                 Join thousands of others on the journey to master sign language. With our interactive tools and supportive community, you'll be signing with confidence in no time.
                </p>
                <div className="mt-6">
                    <Button 
                        onClick={() => openAuthModal('signup')}
                        variant="secondary"
                        className="rounded-full bg-white text-primary group"
                    >
                        Sign Up For Free
                        <span className="ml-2 h-6 w-6 rounded-full bg-black/10 flex items-center justify-center transition-transform group-hover:translate-x-1">
                            <ArrowRight className="h-4 w-4" />
                        </span>
                    </Button>
                </div>
              </div>
              <div className="hidden md:block">
                {ctaHandsImage && (
                  <Image
                    src={ctaHandsImage.imageUrl}
                    alt={ctaHandsImage.description}
                    width={400}
                    height={400}
                    className="rounded-lg object-cover"
                    data-ai-hint={ctaHandsImage.imageHint}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background border-t py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-12">
            <div className='md:col-span-4'>
                <Logo />
                <p className="mt-4 text-textSecondary max-w-xs">An interactive and fun way to learn sign language, backed by AI and a supportive community.</p>
            </div>
            <div className='md:col-span-2'>
              <h3 className="font-semibold text-textSecondary tracking-wider uppercase text-sm">Company</h3>
              <ul className="mt-4 space-y-3">
                <li><Link href="#about" className="text-base text-textPrimary hover:text-primary">About</Link></li>
                <li><Link href="#features" className="text-base text-textPrimary hover:text-primary">Features</Link></li>
                <li><Link href="#pricing" className="text-base text-textPrimary hover:text-primary">Pricing</Link></li>
                <li><Link href="#" className="text-base text-textPrimary hover:text-primary">Careers</Link></li>
              </ul>
            </div>
            <div className='md:col-span-2'>
              <h3 className="font-semibold text-textSecondary tracking-wider uppercase text-sm">Help</h3>
              <ul className="mt-4 space-y-3">
                <li><Link href="#" className="text-base text-textPrimary hover:text-primary">Customer Support</Link></li>
                <li><Link href="#" className="text-base text-textPrimary hover:text-primary">Terms & Conditions</Link></li>
                <li><Link href="#" className="text-base text-textPrimary hover:text-primary">Privacy Policy</Link></li>
              </ul>
            </div>
            <div className='md:col-span-4'>
                <h3 className="font-semibold text-textSecondary tracking-wider uppercase text-sm">Newsletter</h3>
                <p className="mt-4 text-textSecondary">Stay up to date with the latest news and features from Sanjog.</p>
                <form className="mt-4 flex flex-col sm:flex-row gap-2">
                    <Input type="email" placeholder="Enter your email address" className="flex-1" />
                    <Button type="submit">Subscribe</Button>
                </form>
            </div>
          </div>
          <div className="mt-12 border-t border-border pt-8 text-center text-sm text-textSecondary">
            <p>&copy; {new Date().getFullYear()} Sanjog. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialView={authView}
      />
    </div>
  );
};

export default LandingPage;
