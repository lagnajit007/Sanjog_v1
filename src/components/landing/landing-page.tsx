

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
      <svg width="109" height="40" viewBox="0 0 109 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M36.8463 21.8556C36.8212 22.9447 37.1311 23.7615 37.7762 24.306C38.4212 24.8505 39.4097 25.1228 40.7417 25.1228C42.9031 25.1228 43.9838 24.461 43.9838 23.1373C43.9838 22.6515 43.8455 22.2661 43.5691 21.9813C43.301 21.6965 42.8821 21.4912 42.3125 21.3655C41.902 21.2734 41.2695 21.1812 40.415 21.0891C39.5605 20.9886 39.016 20.9174 38.7814 20.8755C37.7008 20.6828 36.8337 20.2639 36.1803 19.6189C35.5269 18.9655 35.2002 18.1152 35.2002 17.068C35.2002 15.9203 35.6567 14.9653 36.5698 14.203C37.4913 13.4322 38.7605 13.0469 40.3773 13.0469C42.1114 13.0469 43.4937 13.516 44.5241 14.4543C45.5629 15.3842 46.0948 16.6156 46.12 18.1487H43.8204C43.7534 16.0878 42.5973 15.0574 40.3522 15.0574C39.4307 15.0574 38.7144 15.2292 38.2034 15.5726C37.7008 15.9161 37.4495 16.3894 37.4495 16.9926C37.4495 17.9392 37.9814 18.5047 39.0453 18.689C39.4474 18.7644 40.0339 18.8482 40.8046 18.9403C41.5753 19.0325 42.1198 19.1037 42.4381 19.1539C43.6361 19.3717 44.5869 19.8157 45.2906 20.4859C45.9943 21.1477 46.3461 22.0148 46.3461 23.0871C46.3461 24.2934 45.8519 25.2736 44.8634 26.0275C43.8832 26.7815 42.4926 27.1585 40.6915 27.1585C40.038 27.1585 39.4223 27.104 38.8443 26.9951C38.2746 26.8946 37.7175 26.7145 37.173 26.4548C36.6369 26.1951 36.1761 25.8683 35.7907 25.4746C35.4138 25.0809 35.1122 24.5741 34.886 23.9541C34.6598 23.3342 34.5509 22.6347 34.5593 21.8556H36.8463Z" fill="#141414"/>
        <path d="M52.5914 27.1585C51.2092 27.1585 50.0782 26.8234 49.1986 26.1532C48.319 25.483 47.8792 24.5112 47.8792 23.2379C47.8792 22.2158 48.2478 21.332 48.985 20.5865C49.7222 19.8409 50.7107 19.4053 51.9506 19.2796C52.4197 19.2293 52.9558 19.1791 53.559 19.1288C54.1622 19.0702 54.6355 19.0283 54.979 19.0031C55.3224 18.9696 55.6785 18.9278 56.0471 18.8775C56.4157 18.8272 56.7089 18.7686 56.9267 18.7016C57.1529 18.6345 57.3288 18.5508 57.4544 18.4502V18.0481C57.4544 17.1518 57.1277 16.4439 56.4743 15.9245C55.8293 15.3967 54.9999 15.1328 53.9862 15.1328C52.9307 15.1328 52.0762 15.3925 51.4228 15.9119C50.7694 16.4313 50.4301 17.1769 50.405 18.1487H48.1179C48.1431 16.6575 48.7169 15.4344 49.8395 14.4794C50.962 13.5244 52.3611 13.0469 54.0365 13.0469C55.0418 13.0469 55.9675 13.2438 56.8136 13.6375C57.6597 14.0228 58.3508 14.6093 58.887 15.3967C59.4315 16.1842 59.7121 17.1015 59.7289 18.1487V23.1876C59.7289 24.2515 60.2567 24.7835 61.3122 24.7835H61.6263V26.794H60.9352C60.2148 26.794 59.5781 26.6349 59.0252 26.3165C58.4723 25.9982 58.0618 25.5123 57.7937 24.8589C57.3246 25.571 56.6293 26.1322 55.7078 26.5427C54.7947 26.9532 53.7559 27.1585 52.5914 27.1585ZM50.229 23.1625C50.229 23.7824 50.4552 24.2641 50.9076 24.6076C51.3683 24.951 51.9925 25.1228 52.7799 25.1228C54.0449 25.1228 55.1381 24.7751 56.0596 24.0798C56.9895 23.3845 57.4544 22.5384 57.4544 21.5415V20.4859C57.3455 20.5697 57.1989 20.6409 57.0146 20.6996C56.8303 20.7498 56.5623 20.8001 56.2104 20.8503C55.8586 20.8922 55.5444 20.9257 55.268 20.9509C54.9999 20.976 54.5559 21.0137 53.936 21.064C53.3244 21.1142 52.826 21.1561 52.4406 21.1896C50.9662 21.332 50.229 21.9897 50.229 23.1625Z" fill="#141414"/>
        <path d="M66.615 13.4239C67.302 13.1725 68.0098 13.0469 68.7387 13.0469C69.4675 13.0469 70.1754 13.1725 70.8623 13.4239C71.5493 13.6752 72.1817 14.0438 72.7598 14.5297C73.3378 15.0156 73.8028 15.6648 74.1546 16.4774C74.5064 17.2816 74.6824 18.1905 74.6824 19.2042V26.794H72.4205V19.6189C72.4205 18.111 72.0896 16.9842 71.4278 16.2386C70.7744 15.4847 69.878 15.1077 68.7387 15.1077C67.5994 15.1077 66.6988 15.4889 66.037 16.2512C65.3836 17.0052 65.0569 18.1361 65.0569 19.644V26.794H62.795V19.2042C62.795 18.1905 62.9709 17.2816 63.3227 16.4774C63.6746 15.6648 64.1395 15.0156 64.7176 14.5297C65.2956 14.0438 65.9281 13.6752 66.615 13.4239Z" fill="#141414"/>
        <path d="M94.9136 20.0713C94.9136 21.1603 94.7334 22.1572 94.3732 23.062C94.0214 23.9667 93.5397 24.7165 92.9281 25.3113C92.3166 25.8977 91.6129 26.3542 90.8171 26.6809C90.0212 26.9993 89.1751 27.1585 88.2787 27.1585C87.3824 27.1585 86.5321 26.9993 85.7278 26.6809C84.932 26.3542 84.2283 25.8977 83.6168 25.3113C83.0136 24.7248 82.5319 23.9793 82.1717 23.0745C81.8115 22.1698 81.6313 21.1687 81.6313 20.0713C81.6313 18.9822 81.8115 17.9895 82.1717 17.0931C82.5319 16.1968 83.0136 15.4595 83.6168 14.8815C84.2283 14.2951 84.932 13.8427 85.7278 13.5244C86.5321 13.2061 87.3824 13.0469 88.2787 13.0469C89.1751 13.0469 90.0212 13.2061 90.8171 13.5244C91.6129 13.8344 92.3166 14.2825 92.9281 14.8689C93.5397 15.447 94.0214 16.1842 94.3732 17.0806C94.7334 17.9769 94.9136 18.9738 94.9136 20.0713ZM83.9812 20.109C83.9812 21.6923 84.3917 22.9153 85.2126 23.7782C86.0336 24.6411 87.0556 25.0725 88.2787 25.0725C89.5018 25.0725 90.5238 24.6411 91.3448 23.7782C92.1658 22.9153 92.5763 21.6923 92.5763 20.109C92.5763 18.4754 92.170 17.2397 91.3574 16.402C90.5448 15.5559 89.5186 15.1328 88.2787 15.1328C87.0389 15.1328 86.0127 15.5559 85.2001 16.402C84.3875 17.2397 83.9812 18.4754 83.9812 20.109Z" fill="#141414"/>
        <path d="M102.767 31.2675C100.941 31.2675 99.4792 30.8822 98.3818 30.1114C97.2843 29.3491 96.7063 28.2433 96.6477 26.794H98.9347C99.0268 28.3857 100.304 29.1816 102.767 29.1816C103.303 29.1816 103.798 29.1229 104.25 29.0056C104.702 28.8884 105.121 28.6999 105.507 28.4402C105.892 28.1805 106.194 27.8161 106.411 27.3469C106.629 26.8862 106.738 26.3417 106.738 25.7134V24.218C106.235 24.8463 105.599 25.349 104.828 25.7259C104.057 26.0945 103.245 26.2788 102.39 26.2788C101.62 26.2788 100.874 26.1322 100.154 25.839C99.4415 25.5458 98.7964 25.1311 98.2184 24.595C97.6487 24.0588 97.1922 23.3677 96.8487 22.5216C96.5052 21.6671 96.3335 20.7247 96.3335 19.6943C96.3335 18.6387 96.5094 17.6837 96.8613 16.8292C97.2215 15.9748 97.7032 15.2752 98.3064 14.7307C98.9095 14.1862 99.5923 13.7715 100.355 13.4867C101.125 13.1935 101.93 13.0469 102.767 13.0469C104.627 13.0469 106.131 13.6501 107.278 14.8564C108.426 16.0543 109 17.6041 109 19.5058V25.839C109 26.7438 108.828 27.548 108.485 28.2517C108.141 28.9638 107.676 29.5334 107.09 29.9607C106.504 30.3879 105.842 30.7104 105.105 30.9282C104.376 31.1544 103.597 31.2675 102.767 31.2675ZM98.7587 19.7194C98.7587 21.1184 99.1441 22.2158 99.9148 23.0117C100.694 23.7992 101.611 24.1929 102.667 24.1929C103.195 24.1929 103.697 24.1049 104.175 23.929C104.652 23.7447 105.088 23.4766 105.482 23.1248C105.884 22.7646 106.202 22.287 106.437 21.6923C106.671 21.0975 106.788 20.4231 106.788 19.6691C106.788 18.1864 106.407 17.0596 105.645 16.2889C104.891 15.5182 103.932 15.1328 102.767 15.1328C101.594 15.1328 100.631 15.5224 99.8771 16.3015C99.1315 17.0806 98.7587 18.2199 98.7587 19.7194Z" fill="#141414"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M73.652 30.9157H74.3808C76.1065 30.9157 77.4217 30.4507 78.3265 29.5208C79.2396 28.591 79.6962 27.2464 79.6962 25.4872V13.4113H77.4343V25.462C77.4343 26.7103 77.1537 27.5941 76.5924 28.1135C76.0395 28.6412 75.1892 28.9051 74.0415 28.9051H73.652V30.9157Z" fill="#141414"/>
        <path d="M77.0196 10.1944C77.0196 9.76717 77.1704 9.40276 77.472 9.10118C77.782 8.7996 78.1464 8.6488 78.5653 8.6488C78.9674 8.6488 79.3192 8.80378 79.6208 9.11374C79.9308 9.41533 80.0857 9.77555 80.0857 10.1944C80.0857 10.63 79.9308 11.0028 79.6208 11.3128C79.3192 11.6144 78.9674 11.7652 78.5653 11.7652C78.1464 11.7652 77.782 11.6144 77.472 11.3128C77.1704 11.0028 77.0196 10.63 77.0196 10.1944Z" fill="#8400FF"/>
        <path d="M13.5732 11.6016C15.8409 11.6016 18.0743 12.1615 20.0742 13.2305C22.0739 14.2994 23.7793 15.8451 25.0391 17.7305C26.2988 19.6159 27.0736 21.7834 27.2959 24.04C27.5181 26.2966 27.1812 28.5731 26.3135 30.668C25.4457 32.763 24.0742 34.6122 22.3213 36.0508C20.5684 37.4892 18.4876 38.4727 16.2637 38.915C14.0398 39.3574 11.7411 39.245 9.57129 38.5869C7.40132 37.9287 5.4267 36.745 3.82324 35.1416L9.45996 29.5049C10.1364 30.1813 10.9694 30.6803 11.8848 30.958C12.8001 31.2357 13.7699 31.2832 14.708 31.0967C15.6462 30.9101 16.5242 30.4946 17.2637 29.8877C18.0032 29.2808 18.5821 28.501 18.9482 27.6172C19.3142 26.7335 19.457 25.7732 19.3633 24.8213C19.2695 23.8692 18.9416 22.9546 18.4102 22.1592C17.8787 21.3638 17.1591 20.7117 16.3154 20.2607C15.4718 19.8099 14.5298 19.5742 13.5732 19.5742V11.6016ZM11.0986 0.264648C13.3227 -0.177746 15.622 -0.0645112 17.792 0.59375C19.962 1.25201 21.9366 2.43561 23.54 4.03906L17.9023 9.67578C17.2259 8.99937 16.393 8.50035 15.4775 8.22266C14.5621 7.945 13.5925 7.89736 12.6543 8.08398C11.7161 8.27061 10.8381 8.68516 10.0986 9.29199C9.35928 9.89877 8.78115 10.6789 8.41504 11.5625C8.04894 12.4463 7.90623 13.4073 8 14.3594C8.09377 15.3114 8.42067 16.2261 8.95215 17.0215C9.48362 17.8168 10.2033 18.469 11.0469 18.9199C11.8905 19.3708 12.8325 19.6064 13.7891 19.6064V27.5781C11.5215 27.5781 9.28889 27.0191 7.28906 25.9502C5.28928 24.8813 3.58403 23.3355 2.32422 21.4502C1.06439 19.5647 0.288674 17.3973 0.0664062 15.1406C-0.15583 12.884 0.182122 10.6076 1.0498 8.5127C1.91756 6.41774 3.28819 4.56844 5.04102 3.12988C6.79384 1.69138 8.87469 0.707074 11.0986 0.264648Z" fill="#141414"/>
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
