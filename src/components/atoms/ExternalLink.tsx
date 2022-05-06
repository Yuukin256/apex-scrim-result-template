import type { FC } from 'react';

type ExternalLinkProps = Omit<JSX.IntrinsicElements['a'], 'target' | 'rel'>;

const ExternalLink: FC<ExternalLinkProps> = (props) => <a target='_blank' rel='noopener noreferrer' {...props}></a>;

export default ExternalLink;
