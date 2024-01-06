import { BaseHeader } from './base-header';
import { HeaderWithActions } from './header-with-actions';

interface TheHeaderProps {
  className?: string;
  withActions?: boolean;
}

export function TheHeader({ className, withActions }: TheHeaderProps) {
  if (withActions) {
    return <HeaderWithActions className={className} />;
  }

  return <BaseHeader className={className} />;
}
