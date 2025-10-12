
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Manage your account and application settings.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Settings content will go here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
