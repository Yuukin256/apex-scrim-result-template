import type { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = (props) => <div>{props.children}</div>;

export default Layout;
