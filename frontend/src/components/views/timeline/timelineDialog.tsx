import { VisualizationTypes } from '@illustry/types';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

export interface TimelineDialogProps {
  event: VisualizationTypes.TimelineEvent;
}
const TimelineDialog = ({ event }: TimelineDialogProps) => (
    <Dialog>
      <DialogTrigger>{event.summary}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{event.summary}</DialogTitle>
          <DialogDescription>{event.description}</DialogDescription>
        </DialogHeader>
        <span className="text-gray-700 dark:text-gray-400">
          Author: {event.author}
        </span>
        {event.tags && (
          <div className="flex flex-wrap">
            <span className="text-gray-700 dark:text-gray-400">
              Tags:
            </span>
            <ul className="flex ml-2 flex-wrap">
              {event.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="capitalize text-gray-700 dark:text-gray-400 ml-2 mb-2"
                >
                  {tag.name}
                </Badge>
              ))}
            </ul>
          </div>
        )}
      </DialogContent>
    </Dialog>
);

export default TimelineDialog;
