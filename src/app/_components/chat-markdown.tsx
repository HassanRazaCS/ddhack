import { memo } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

const components: Partial<Components> = {
  pre: ({ children }) => <>{children}</>,
  ol: ({ children, ...props }) => {
    return (
      <ol className="ml-4 list-outside list-decimal" {...props}>
        {children}
      </ol>
    );
  },
  li: ({ children, ...props }) => {
    return (
      <li className="py-1" {...props}>
        {children}
      </li>
    );
  },
  ul: ({ children, ...props }) => {
    return (
      <ul className="ml-4 list-outside list-disc" {...props}>
        {children}
      </ul>
    );
  },
  strong: ({ children, ...props }) => {
    return (
      <span className="font-semibold" {...props}>
        {children}
      </span>
    );
  },
  a: ({ children, href, ...props }) => {
    if (!href) return <span>{children}</span>;

    return (
      <a
        className="text-blue-600 hover:text-blue-700 underline"
        target="_blank"
        rel="noreferrer"
        href={href}
        {...props}
      >
        {children}
      </a>
    );
  },
  h1: ({ children, ...props }) => {
    return (
      <h1 className="mt-4 mb-2 text-lg font-semibold" {...props}>
        {children}
      </h1>
    );
  },
  h2: ({ children, ...props }) => {
    return (
      <h2 className="mt-4 mb-2 text-base font-semibold" {...props}>
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }) => {
    return (
      <h3 className="mt-4 mb-2 text-sm font-semibold" {...props}>
        {children}
      </h3>
    );
  },
  p: ({ children, ...props }) => {
    return (
      <p className="mb-2" {...props}>
        {children}
      </p>
    );
  },
};

const remarkPlugins = [remarkGfm];

// Function to decode common HTML entities
const decodeHtmlEntities = (text: string): string => {
  const entities: Record<string, string> = {
    '&apos;': "'",
    '&quot;': '"',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&nbsp;': ' ',
    '&lsquo;': "'",
    '&rsquo;': "'",
    '&ldquo;': '"',
    '&rdquo;': '"',
    '&#39;': "'",
    '&#x27;': "'",
  };
  
  return text.replace(/&[a-zA-Z0-9#]+;/g, (entity) => entities[entity] ?? entity);
};

const NonMemoizedMarkdown = ({ children }: { children: string }) => {
  // Decode HTML entities before passing to ReactMarkdown
  const decodedContent = decodeHtmlEntities(children);
  
  return (
    <ReactMarkdown remarkPlugins={remarkPlugins} components={components}>
      {decodedContent}
    </ReactMarkdown>
  );
};

export const ChatMarkdown = memo(
  NonMemoizedMarkdown,
  (prevProps, nextProps) => prevProps.children === nextProps.children,
);