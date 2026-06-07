import { ICardData } from '@/types/';
import { Label, RadioGroupItem } from '@/components/ui';

type Props = {
  cards: ICardData[];
  onSelect: (card: ICardData, index: number) => void; 
};

export const SavedCardsList = ({ cards, onSelect }: Props) => {
  return (
    <>
      {cards.map((card, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <RadioGroupItem
            value={`saved-${idx}`}
            id={`saved-${idx}`}
            className="w-5 h-5 border-[0.5px] border-grey"
            onClick={() => onSelect(card, idx)}
          />
          <Label htmlFor={`saved-${idx}`}>**** **** **** {card.number.slice(-4)}</Label>
        </div>
      ))}
    </>
  );
};
