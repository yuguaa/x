import { Empty, Typography } from 'antd';
import * as React from 'react';

export interface PreviewProps {
  task?: { title: string; description: string };
}

export default function Preview(props: PreviewProps) {
  const { task } = props;

  // ============================ Data ============================

  // =========================== Render ===========================
  if (!task) {
    return <Empty />;
  }

  return (
    <Typography>
      <h3>{task.title}</h3>
      <pre>
        {`
${task.description}. Here is the mock content:
${task.description.repeat(30)}
`.trim()}
      </pre>
    </Typography>
  );
}
