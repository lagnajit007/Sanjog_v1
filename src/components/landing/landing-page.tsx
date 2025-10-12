
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
        description: 'Lorem ipsum dolor sit amet doloroli sitiol conse ctetur adipiscing elit.',
        features: ['Access to fun quizzes', 'Limited creative activities', 'Community access', '24/7 chatbot support'],
        isPopular: false,
      },
      {
        title: 'Pro',
        for: 'For startups',
        price: '₹499',
        period: '/monthly',
        icon: <Video className="h-8 w-8 text-primary" />,
        description: 'Lorem ipsum dolor sit amet doloroli sitiol conse ctetur adipiscing elit.',
        features: ['Everything in Starter', 'Unlimited access to all activities', 'Progress tracking dashboard', 'Priority support'],
        isPopular: true,
      },
      {
        title: 'Enterprise',
        for: 'For big companies',
        price: 'Custom',
        icon: <Users className="h-8 w-8 text-primary" />,
        description: 'Lorem ipsum dolor sit amet doloroli sitiol conse ctetur adipiscing elit.',
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
        description: 'Lorem ipsum dolor sit amet doloroli sitiol conse ctetur adipiscing elit.',
        features: ['Access to fun quizzes', 'Limited creative activities', 'Community access', '24/7 chatbot support'],
        isPopular: false,
      },
      {
        title: 'Pro',
        for: 'For startups',
        price: '₹4990',
        period: '/annually',
        icon: <Video className="h-8 w-8 text-primary" />,
        description: 'Lorem ipsum dolor sit amet doloroli sitiol conse ctetur adipiscing elit.',
        features: ['Everything in Starter', 'Unlimited access to all activities', 'Progress tracking dashboard', 'Priority support'],
        isPopular: true,
      },
      {
        title: 'Enterprise',
        for: 'For big companies',
        price: 'Custom',
        icon: <Users className="h-8 w-8 text-primary" />,
        description: 'Lorem ipsum dolor sit amet doloroli sitiol conse ctetur adipiscing elit.',
        features: ['All Pro features', 'Unlimited sign translation access', 'Dedicated mentor support', 'Onboarding & training'],
        isPopular: false,
      },
    ]
  };

  const plansToShow = isAnnual ? pricingPlans.annually : pricingPlans.monthly;


  return (
    <div className="bg-background text-textPrimary font-body">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary">
              Sanjog
            </Link>
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
              The best place to learn and play for all
            </h1>
            <p className="mt-6 text-lg text-textSecondary">
              Discover thousands of fun and interactive learning activities to support learning progress.
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
              <p className="ml-4 text-sm font-medium text-textSecondary">+10k Learners</p>
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
        <section id="features" className="bg-[#0F0434] text-white py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div className="order-2 md:order-1">
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
              <div className="order-1 md:order-2">
                <h2 className="text-3xl font-headline font-bold md:text-4xl">
                  Simplify Your Video Translation Today
                </h2>
                <p className="mt-4 text-white/80">
                  Instantly translate your videos to sign language with AI. Sanjog bridges accessibility gaps for the deaf and hard-of-hearing community, making content accessible to profoundly Deaf people worldwide.
                </p>
                <div className="mt-6">
                  <Button
                    variant="secondary"
                    className="bg-primary text-primary-foreground"
                    onClick={() => openAuthModal('signup')}
                  >
                    Sign Up <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Features Section */}
        <section className="bg-surface py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-left mb-12">
                    <h2 className="text-lg font-bold text-primary">INTERACTIVE FEATURES</h2>
                    <p className="mt-2 text-3xl md:text-4xl font-headline font-bold text-textPrimary max-w-2xl">
                        Our interactive features
                    </p>
                </div>
                <div className="mt-12 grid gap-8 md:grid-cols-3">
                    <Card className="bg-[#F1F0FB] p-6 text-left border-none">
                        <div className="mb-4 inline-block rounded-full bg-white p-3 shadow-sm" style={{ clipPath: 'polygon(50% 0%, 83% 12%, 100% 43%, 94% 78%, 68% 100%, 32% 100%, 6% 78%, 0% 43%, 17% 12%)' }}>
                            <GraduationCap className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle className="mt-4 text-2xl font-bold">Fun Quiz</CardTitle>
                        <CardContent className="p-0 mt-2">
                            <p className="text-textSecondary">Discover thousands of fun and interactive learning.</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-primary p-6 text-left text-white border-none">
                        <div className="mb-4 inline-block rounded-full bg-white/20 p-3 shadow-sm" style={{ clipPath: 'polygon(50% 0%, 83% 12%, 100% 43%, 94% 78%, 68% 100%, 32% 100%, 6% 78%, 0% 43%, 17% 12%)' }}>
                           <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 8V12M12 12V16M12 12H16M12 12H8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M18.5 12C18.5 13.9655 18.0051 15.8239 17.1375 17.391C16.2699 18.9581 15.071 20.157 13.6822 20.8528C12.2934 21.5486 10.7719 21.713 9.29616 21.3259C7.82041 20.9387 6.46747 20.0223 5.42173 18.721C4.37599 17.4197 3.69931 15.8113 3.48679 14.1221C3.27426 12.433 3.53526 10.7455 4.23896 9.24751C4.94265 7.74952 6.05943 6.51263 7.44754 5.68888C8.83566 4.86514 10.4373 4.5 12 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        </div>
                        <CardTitle className="mt-4 text-2xl font-bold">Creative Activities</CardTitle>
                        <CardContent className="p-0 mt-2">
                            <p className="text-white/80">Discover thousands of fun and interactive learning activities.</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-[#FFC94D] p-6 text-left border-none">
                        <div className="mb-4 inline-block rounded-full bg-white/50 p-3 shadow-sm" style={{ clipPath: 'polygon(50% 0%, 83% 12%, 100% 43%, 94% 78%, 68% 100%, 32% 100%, 6% 78%, 0% 43%, 17% 12%)' }}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 8V12M12 12V16M12 12H16M12 12H8" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M18.5 12C18.5 13.9655 18.0051 15.8239 17.1375 17.391C16.2699 18.9581 15.071 20.157 13.6822 20.8528C12.2934 21.5486 10.7719 21.713 9.29616 21.3259C7.82041 20.9387 6.46747 20.0223 5.42173 18.721C4.37599 17.4197 3.69931 15.8113 3.48679 14.1221C3.27426 12.433 3.53526 10.7455 4.23896 9.24751C4.94265 7.74952 6.05943 6.51263 7.44754 5-68888C8.83566 4.86514 10.4373 4.5 12 4.5" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        </div>
                        <CardTitle className="mt-4 text-2xl font-bold">Learn with Games</CardTitle>
                        <CardContent className="p-0 mt-2">
                            <p className="text-textSecondary">Discover thousands of fun and interactive learning.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

        {/* Community Section */}
        <section id="community" className="bg-[#0F0434] text-white py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block bg-primary/20 text-primary text-sm font-semibold px-4 py-1.5 rounded-full">Sparkly Growth</span>
            <h2 className="text-3xl font-headline font-bold mt-4 md:text-4xl">
              Join a Thriving Learning Community
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/80">
              Sparkly connects you with millions of learners and expert mentors, providing the guidance and resources needed to excel in your journey.
            </p>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
              <Card className="bg-white/10 border-primary/20 text-center py-6">
                <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/20 p-3">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <p className="text-4xl font-bold text-white">2.5M+</p>
                <p className="mt-2 text-white/80">Engaged Learners</p>
              </Card>
              <Card className="bg-white/10 border-primary/20 text-center py-6">
                <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/20 p-3">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <p className="text-4xl font-bold text-white">5K+</p>
                <p className="mt-2 text-white/80">Courses Available</p>
              </Card>
              <Card className="bg-white/10 border-primary/20 text-center py-6">
                <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/20 p-3">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <p className="text-4xl font-bold text-white">800+</p>
                <p className="mt-2 text-white/80">Expert Mentors</p>
              </Card>
            </div>
            <div className="mt-12">
                <Button size="lg" onClick={() => openAuthModal('signup')}>Explore courses</Button>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section id="about" className="py-16 md:py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-12">
              <h2 className="text-lg font-bold text-primary uppercase">mission</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div className="bg-[#1C1C35] text-white p-10 rounded-2xl h-full flex flex-col">
                  <h3 className="text-4xl font-bold leading-tight mb-4">
                      Introducing our real-time sign language translation platform, designed to break down communication instantly.
                  </h3>
                  <p className="text-white/70 mb-8 flex-grow">
                    Profoundly Deaf people worldwide. Profoundly Deaf people worldwide. Profoundly Deaf people worldwide. Profoundly Deaf people worldwide.
                  </p>
                  <Button variant="secondary" className="bg-white text-black self-start">More about us</Button>
              </div>
              <div className="grid grid-cols-2 grid-rows-2 gap-8">
                  <div className="col-span-1 row-span-1">
                      {missionImage && (
                          <Image
                            src={missionImage.imageUrl}
                            alt={missionImage.description}
                            width={300}
                            height={300}
                            className="rounded-2xl shadow-lg object-cover w-full h-full"
                            data-ai-hint={missionImage.imageHint}
                          />
                      )}
                  </div>
                  <div className="bg-[#FFC94D] text-black p-6 rounded-2xl flex flex-col justify-between col-span-1 row-span-1">
                      <div>
                          <p className="text-4xl font-bold">Over</p>
                          <p className="text-5xl font-bold">5,000</p>
                      </div>
                      <p>Discover thousands of fun and interactive learning</p>
                  </div>
                  <div className="bg-primary/20 text-primary p-6 rounded-2xl flex items-end justify-between col-span-2 row-span-1">
                      <p className="max-w-xs">Profoundly Deaf people worldwide</p>
                      <p className="text-7xl font-bold">7m</p>
                  </div>
              </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="bg-[#0F0434] text-white py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <h2 className="text-lg font-bold text-primary uppercase mb-8">process</h2>
                <ul className="space-y-8">
                  <li className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-white">
                      <Share2 className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Large dataset of sign language</h3>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-white">
                      <BrainCircuit className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">AI-powered blending</h3>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-white">
                      <MessageCircle className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">24*7 chatbot support</h3>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-white">
                      <Video className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Real time learning</h3>
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
        <section id="pricing" className="text-textPrimary py-16 md:py-24 bg-surface">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="inline-block bg-secondary text-primary text-sm font-semibold px-4 py-1.5 rounded-full">Pricing</span>
              <h2 className="text-3xl font-headline font-bold mt-4 md:text-4xl">Our pricing plans</h2>
              <p className="mx-auto mt-4 max-w-2xl text-textSecondary">
                Lorem ipsum dolor sit amet consectetur adipiscing elit dolor posuere vel venenatis eu sit massa volutpat.
              </p>
              <div className="mt-8 flex justify-center items-center gap-4">
                <Label htmlFor="pricing-toggle" className={cn(!isAnnual && "text-primary")}>Monthly</Label>
                <Switch id="pricing-toggle" checked={isAnnual} onCheckedChange={setIsAnnual} />
                <Label htmlFor="pricing-toggle" className={cn(isAnnual && "text-primary")}>Annually</Label>
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
                  <p className={cn("text-sm mb-6", plan.isPopular ? "text-white/70" : "text-muted-foreground")}>{plan.description}</p>
                  
                  <div className="mb-8">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    {plan.period && <span className={cn("text-sm", plan.isPopular ? "text-white/70" : "text-muted-foreground")}>{plan.period}</span>}
                  </div>

                  <div className="flex-grow">
                      <p className="font-semibold mb-4">What's included</p>
                      <ul className="space-y-3">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <div className={cn("w-6 h-6 rounded-full flex items-center justify-center", plan.isPopular ? "bg-white/20" : "bg-secondary")}>
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
        <section className="bg-[#1E1E2F] py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-headline font-bold md:text-4xl text-white">Get involved with us</h2>
                <p className="mt-4 text-white/80">
                  We’re seeking forward-thinking partners to help expand access to sign language learning globally.
                </p>
                <div className="mt-6">
                  <Button onClick={() => openAuthModal('signup')}>Sign Up</Button>
                </div>
              </div>
              <div>
              {ctaHandsImage && (
                <Image
                  src={ctaHandsImage.imageUrl}
                  alt={ctaHandsImage.description}
                  width={600}
                  height={400}
                  className="rounded-lg"
                  data-ai-hint={ctaHandsImage.imageHint}
                />
              )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-surface py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-12">
            <div className='md:col-span-4'>
                <Link href="/" className="flex items-center gap-2">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 17.5V6.5C7 5.11929 8.11929 4 9.5 4H14.5C15.8807 4 17 5.11929 17 6.5V12.5C17 13.8807 15.8807 15 14.5 15H10.5L7 17.5Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 9H12.01" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-2xl font-bold text-textPrimary">sanjog</span>
                </Link>
                <p className="mt-4 text-textSecondary max-w-xs">Discover thousands of fun and interactive learning activities to support learning progress</p>
            </div>
            <div className='md:col-span-2'>
              <h3 className="font-semibold text-textSecondary tracking-wider uppercase text-sm">Company</h3>
              <ul className="mt-4 space-y-3">
                <li><Link href="#" className="text-base text-textPrimary hover:text-primary">About</Link></li>
                <li><Link href="#" className="text-base text-textPrimary hover:text-primary">Features</Link></li>
                <li><Link href="#" className="text-base text-textPrimary hover:text-primary">Works</Link></li>
                <li><Link href="#" className="text-base text-textPrimary hover:text-primary">Career</Link></li>
              </ul>
            </div>
            <div className='md:col-span-2'>
              <h3 className="font-semibold text-textSecondary tracking-wider uppercase text-sm">Help</h3>
              <ul className="mt-4 space-y-3">
                <li><Link href="#" className="text-base text-textPrimary hover:text-primary">Customer Support</Link></li>
                <li><Link href="#" className="text-base text-textPrimary hover:text-primary">Delivery Details</Link></li>
                <li><Link href="#" className="text-base text-textPrimary hover:text-primary">Terms & Conditions</Link></li>
                <li><Link href="#" className="text-base text-textPrimary hover:text-primary">Privacy Policy</Link></li>
              </ul>
            </div>
            <div className='md:col-span-4'>
                <h3 className="font-semibold text-textSecondary tracking-wider uppercase text-sm">Newsletter</h3>
                <form className="mt-4 flex flex-col sm:flex-row gap-2">
                    <Input type="email" placeholder="Enter your email address" className="flex-1" />
                    <Button type="submit">Subscribe Now</Button>
                </form>
            </div>
          </div>
          <div className="mt-12 border-t border-border pt-8 text-center text-sm text-textSecondary">
            <p>&copy; Copyright {new Date().getFullYear()}, All Rights Reserved by Sanjog</p>
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
