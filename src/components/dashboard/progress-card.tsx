import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { ProgressCardData } from '@/lib/data';

const ProgressCard = ({ title, value, progress, color }: ProgressCardData) => {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-md font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-2 text-2xl font-bold">{value}</p>
        <Progress value={progress} indicatorClassName={color} />
      </CardContent>
    </Card>
  );
};

export default ProgressCard;
