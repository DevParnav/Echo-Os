import React, { useState } from 'react';
import { Search, Eye, EyeOff } from 'lucide-react';

// --- Text Input Base Component ---
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const TextInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, iconLeft, iconRight, className = '', disabled, ...props }, ref) => {
    return (
      <div className="input-wrapper">
        {label && <small style={{ fontWeight: 'var(--font-weight-medium)', color: 'var(--color-primary)' }}>{label}</small>}
        <div className="input-container">
          {iconLeft && <div className="input-icon-container left">{iconLeft}</div>}
          <input
            ref={ref}
            disabled={disabled}
            className={`input-field ${iconLeft ? 'input-icon-left' : ''} ${
              iconRight ? 'input-icon-right' : ''
            } ${className}`}
            {...props}
          />
          {iconRight && <div className="input-icon-container right">{iconRight}</div>}
        </div>
        {error && <small style={{ color: 'var(--color-danger)' }}>{error}</small>}
      </div>
    );
  }
);
TextInput.displayName = 'TextInput';

// --- Search Input ---
export const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder = 'Search thoughts, outcomes, memories...', ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        placeholder={placeholder}
        iconLeft={<Search size={18} />}
        {...props}
      />
    );
  }
);
SearchInput.displayName = 'SearchInput';

// --- Password Input ---
export const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className="input-wrapper">
        <TextInput
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          iconRight={
            <button
              type="button"
              onClick={togglePasswordVisibility}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-secondary)',
                display: 'flex',
                alignItems: 'center',
                padding: '4px',
              }}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
          style={{ paddingRight: '40px' }} // extra padding to avoid overlap
          {...props}
        />
      </div>
    );
  }
);
PasswordInput.displayName = 'PasswordInput';

// --- Textarea ---
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="input-wrapper">
        {label && <small style={{ fontWeight: 'var(--font-weight-medium)', color: 'var(--color-primary)' }}>{label}</small>}
        <textarea ref={ref} className={`input-field ${className}`} {...props} />
        {error && <small style={{ color: 'var(--color-danger)' }}>{error}</small>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

// --- Dropdown (Select) ---
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

export const Dropdown = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = '', ...props }, ref) => {
    return (
      <div className="input-wrapper">
        {label && <small style={{ fontWeight: 'var(--font-weight-medium)', color: 'var(--color-primary)' }}>{label}</small>}
        <select ref={ref} className={`input-field ${className}`} {...props}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <small style={{ color: 'var(--color-danger)' }}>{error}</small>}
      </div>
    );
  }
);
Dropdown.displayName = 'Dropdown';

// --- Checkbox ---
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className = '', ...props }, ref) => {
    return (
      <label className={`checkbox-label ${className}`}>
        <input ref={ref} type="checkbox" {...props} />
        <span className="checkbox-custom">
          {props.checked && (
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="var(--color-white)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="2.5 6 4.5 8 9.5 3" />
            </svg>
          )}
        </span>
        {label}
      </label>
    );
  }
);
Checkbox.displayName = 'Checkbox';

// --- Switch (Toggle) ---
export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, className = '', ...props }, ref) => {
    return (
      <label className={`switch-label ${className}`}>
        <input ref={ref} type="checkbox" {...props} />
        <span className="switch-track">
          <span className="switch-thumb" />
        </span>
        {label && <small style={{ fontWeight: 'var(--font-weight-medium)', color: 'var(--color-primary)' }}>{label}</small>}
      </label>
    );
  }
);
Switch.displayName = 'Switch';

// --- Slider ---
export interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ label, min = 0, max = 100, step = 1, value, className = '', ...props }, ref) => {
    return (
      <div className="input-wrapper">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {label && <small style={{ fontWeight: 'var(--font-weight-medium)', color: 'var(--color-primary)' }}>{label}</small>}
          {value !== undefined && <small style={{ color: 'var(--color-secondary)' }}>{value}</small>}
        </div>
        <input
          ref={ref}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          className={`slider-input ${className}`}
          {...props}
        />
      </div>
    );
  }
);
Slider.displayName = 'Slider';
