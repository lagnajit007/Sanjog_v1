import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import type { LearningCardData } from '@/lib/data';

const LearningCard = ({ background, title, subtitle, category }: LearningCardData) => {
  return (
    <Card className={`overflow-hidden shadow-sm ${background}`}>
      <CardHeader>
        <Badge variant="secondary" className="w-fit bg-white/50">{category}</Badge>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-xl font-bold mb-1">{title}</CardTitle>
        <CardDescription className="text-foreground/80 text-sm">{subtitle}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="bg-white/50 hover:bg-white/80">
          Start Course <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LearningCard;
