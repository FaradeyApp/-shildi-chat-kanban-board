import { ChangeEvent, forwardRef, useId } from 'react';
import clsx from 'clsx';

import styles from './FloatingDatepicker.module.scss';
import { CalendarIcon, Text } from '@/shared/ui-kit';
import dayjs, { type Dayjs } from 'dayjs';

type FloatingDetepickerProps = {
  label: string;
  value: Dayjs;
  onChange: (newValue: Dayjs) => void;
  errorMessage?: string;
};

export const FloatingDetepicker = forwardRef<HTMLInputElement, FloatingDetepickerProps>(
  (props, ref) => {
    const id = useId();
    const { label, errorMessage, value, onChange } = props;

    const containerClasses = clsx(styles.floatingDatepicker, {
      [styles.floatingDatepicker_invalid]: errorMessage,
      [styles.floatingDatepicker_unfilled]: !value,
      [styles.floatingDatepicker_filled]: !!value,
    });

    const onDateChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChange(dayjs(event.target.value));
    };

    return (
      <div className={containerClasses}>
        {value && (
          <Text tag='p' size='md' className={styles.date}>
            {value.format('DD.MM.YYYY')}
          </Text>
        )}

        <input
          type='date'
          id={id}
          ref={ref}
          placeholder={label}
          className={styles.datepicker}
          aria-errormessage={errorMessage}
          onChange={onDateChange}
        />

        <label htmlFor={id} className={styles.label}>
          {label}
        </label>

        <div className={styles.floatingDatepicker__icon}>
          <CalendarIcon />
        </div>
      </div>
    );
  }
);
