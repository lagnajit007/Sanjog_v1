
'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCog, BookOpen, Settings as SettingsIcon, Upload, Bell, Palette, Bot, Shield, Trash2 } from "lucide-react";

const Section: React.FC<{ title: string; description: string; children: React.ReactNode; className?: string }> = ({ title, description, children, className }) => (
  <Card className={className}>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      {children}
    </CardContent>
  </Card>
);

const FormField: React.FC<{ label: string; children: React.ReactNode; className?: string }> = ({ label, children, className }) => (
  <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 ${className}`}>
    <Label className="font-semibold text-textPrimary w-full sm:w-1/3">{label}</Label>
    <div className="w-full sm:w-2/3">{children}</div>
  </div>
);

const AccountTab = () => (
    <div className="space-y-6">
        <Section title="Profile" description="This information will be displayed publicly.">
            <FormField label="Username">
                <Input defaultValue="Jenny Wilson" />
            </FormField>
             <FormField label="Avatar">
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src="https://picsum.photos/seed/1/100/100" />
                        <AvatarFallback>JW</AvatarFallback>
                    </Avatar>
                    <Button variant="outline"><Upload className="w-4 h-4 mr-2" /> Change Avatar</Button>
                </div>
            </FormField>
             <FormField label="Email">
                <Input defaultValue="jen.wilson@example.com" disabled />
            </FormField>
        </Section>
        <Section title="Security" description="Manage your account security settings.">
             <FormField label="Password">
                <Button variant="outline">Reset Password</Button>
            </FormField>
            <FormField label="Two-Factor Authentication">
                <div className="flex items-center gap-4">
                    <Switch id="2fa-switch" />
                    <Label htmlFor="2fa-switch">Enable 2FA</Label>
                </div>
            </FormField>
        </Section>
        <Section title="Danger Zone" description="These actions are permanent and cannot be undone." className="border-destructive">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg bg-destructive/5">
                <div>
                    <p className="font-semibold text-destructive">Delete Account</p>
                    <p className="text-sm text-muted-foreground">Permanently remove your account and all associated data.</p>
                </div>
                <Button variant="destructive" className="mt-2 sm:mt-0"><Trash2 className="w-4 h-4 mr-2" /> Delete</Button>
            </div>
        </Section>
    </div>
);

const PreferencesTab = () => (
  <div className="space-y-6">
    <Section title="Appearance" description="Customize the look and feel of the app.">
      <FormField label="Theme">
        <div className="flex items-center gap-4">
          <Switch id="dark-mode" />
          <Label htmlFor="dark-mode">Dark Mode</Label>
        </div>
      </FormField>
      <FormField label="Language">
        <Select defaultValue="en">
          <SelectTrigger>
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="es">Spanish</SelectItem>
            <SelectItem value="fr">French</SelectItem>
             <SelectItem value="hi">Hindi</SelectItem>
          </SelectContent>
        </Select>
      </FormField>
    </Section>
    <Section title="Learning" description="Adjust your learning and practice settings.">
        <FormField label="Gesture Difficulty">
            <Select defaultValue="medium">
                <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
            </Select>
        </FormField>
        <FormField label="Daily Goal">
             <div className="flex items-center gap-4">
                <Slider defaultValue={[5]} max={10} step={1} />
                <span className="font-semibold w-12 text-center">5 lessons</span>
            </div>
        </FormField>
        <FormField label="Voice Assistant">
             <div className="flex items-center gap-4">
                <Switch id="voice-assistant" defaultChecked />
                <Label htmlFor="voice-assistant">Enable voice feedback</Label>
            </div>
        </FormField>
    </Section>
    <Section title="Notifications" description="Manage how you receive notifications.">
       <FormField label="Daily Reminders">
             <div className="flex items-center gap-4">
                <Switch id="reminders" defaultChecked />
                <Label htmlFor="reminders">Receive daily practice reminders</Label>
            </div>
        </FormField>
         <FormField label="Reminder Time">
            <Input type="time" defaultValue="18:00" className="w-auto" />
        </FormField>
    </Section>
    <div className="flex justify-end">
        <Button>Save Preferences</Button>
    </div>
  </div>
);

const AccessibilityTab = () => (
    <div className="space-y-6">
        <Section title="Display" description="Adjust visual elements for better readability.">
            <FormField label="Text Size">
                <div className="flex items-center gap-4">
                    <Slider defaultValue={[1]} min={0.8} max={1.5} step={0.1} />
                     <span className="font-semibold w-12 text-center">100%</span>
                </div>
            </FormField>
             <FormField label="High Contrast Mode">
                <div className="flex items-center gap-4">
                    <Switch id="high-contrast" />
                    <Label htmlFor="high-contrast">Enable high contrast</Label>
                </div>
            </FormField>
        </Section>
        <Section title="Motion" description="Control animations and motion effects.">
             <FormField label="Reduce Motion">
                <div className="flex items-center gap-4">
                    <Switch id="reduce-motion" />
                    <Label htmlFor="reduce-motion">Disable non-essential animations</Label>
                </div>
            </FormField>
        </Section>
        <Section title="App Data & Info" description="Manage application data and view policies.">
             <FormField label="Cached Data">
                <Button variant="outline">Clear Cached Data</Button>
            </FormField>
             <FormField label="Feedback">
                <Button variant="outline">Send Feedback</Button>
            </FormField>
            <FormField label="Privacy Policy">
                <Button variant="link" className="p-0 h-auto">View Privacy Policy</Button>
            </FormField>
             <FormField label="App Version">
                <p className="text-sm text-muted-foreground">1.0.2</p>
            </FormField>
        </Section>
    </div>
);


export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-textPrimary">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and personalize your learning experience.</p>
      </div>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 h-auto sm:h-12 rounded-lg p-1.5">
          <TabsTrigger value="account" className="py-2.5">
            <UserCog className="w-5 h-5 mr-2" />
            Account
          </TabsTrigger>
          <TabsTrigger value="preferences" className="py-2.5">
            <BookOpen className="w-5 h-5 mr-2" />
            Preferences
          </TabsTrigger>
          <TabsTrigger value="accessibility" className="py-2.5">
            <SettingsIcon className="w-5 h-5 mr-2" />
            Accessibility
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="mt-6">
          <AccountTab />
        </TabsContent>
        <TabsContent value="preferences" className="mt-6">
          <PreferencesTab />
        </TabsContent>
        <TabsContent value="accessibility" className="mt-6">
            <AccessibilityTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
