// src/components/MarkdownRenderer.tsx
import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';

interface CodeProps {
  inline?: boolean;
  className?: string;
  children?: ReactNode;
}

const MarkdownRenderer = ({ content }: { content: string }) => {
  const renderers: Components = {
    h1: ({ node, ...props }) => <Typography variant="h4" component="h1" gutterBottom {...props} />,
    h2: ({ node, ...props }) => <Typography variant="h5" component="h2" gutterBottom {...props} />,
    h3: ({ node, ...props }) => <Typography variant="h6" component="h3" gutterBottom {...props} />,
    p: ({ node, ...props }) => <Typography variant="body1" paragraph {...props} />,
    ul: ({ node, ...props }) => (
      <Typography
        component="ul"
        sx={{
          pl: 4,
          listStyleType: 'disc',
          '& > li': {
            display: 'list-item',
            mb: 1,
          },
        }}
        {...props}
      />
    ),
    ol: ({ node, ...props }) => (
      <Typography
        component="ol"
        sx={{
          pl: 4,
          listStyleType: 'decimal',
          '& > li': {
            display: 'list-item',
            mb: 1,
          },
        }}
        {...props}
      />
    ),
    li: ({ node, ...props }) => <Typography component="li" variant="body1" {...props} />,
    code: ({ inline, className, children, ...props }: CodeProps) => {
      const match = /language-(\w+)/.exec(className || '');
      return !inline ? (
        <Box
          component="pre"
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            padding: 2,
            borderRadius: 1,
            overflowX: 'auto',
          }}
        >
          <Typography component="code" variant="body2" {...props}>
            {String(children).replace(/\n$/, '')}
          </Typography>
        </Box>
      ) : (
        <Typography
          component="code"
          variant="body2"
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            px: 0.5,
            borderRadius: 0.5,
          }}
          {...props}
        >
          {children}
        </Typography>
      );
    },
  };

  return (
    <ReactMarkdown components={renderers} className="markdown-content">
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
