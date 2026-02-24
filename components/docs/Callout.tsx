interface CalloutProps {
  type: 'info' | 'warning' | 'success' | 'error';
  title?: string;
  children: React.ReactNode;
}

const calloutConfig = {
  info: {
    icon: 'ℹ️',
    className: 'doc-callout doc-callout-info'
  },
  warning: {
    icon: '⚠️',
    className: 'doc-callout doc-callout-warning'
  },
  success: {
    icon: '✅',
    className: 'doc-callout doc-callout-success'
  },
  error: {
    icon: '🚨',
    className: 'doc-callout doc-callout-error'
  }
};

export function Callout({ type, title, children }: CalloutProps) {
  const config = calloutConfig[type];

  return (
    <div className={config.className}>
      <div className="doc-callout-icon">{config.icon}</div>
      <div className="doc-callout-content">
        {title && <span className="doc-callout-title">{title}</span>}
        <div className="doc-callout-text">{children}</div>
      </div>
    </div>
  );
}

export default Callout;
