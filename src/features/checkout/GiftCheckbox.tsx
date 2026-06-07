import { Controller, useFormContext } from 'react-hook-form';

import { Label, Checkbox } from '@/components/ui';
import { IFormSchema } from '@/types/';

export const GiftCheckbox = () => {
  const { control } = useFormContext<IFormSchema>();

  return (
    <div className="flex items-center gap-2">
      <Controller
        name="personalInfo.isGift"
        control={control}
        render={({ field }) => (
          <div className="flex items-center gap-2">
            <Checkbox id="isGift" checked={field.value} onCheckedChange={field.onChange} />
            <Label htmlFor="isGift">Загорнути в подарункову упаковку</Label>
          </div>
        )}
      />
    </div>
  );
};
