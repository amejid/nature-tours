import { createPortal } from 'react-dom';

type Props = {
  type: string;
  text: string;
};

const Alert = ({ type, text }: Props) => {
  return createPortal(
    <div className={`alert alert--${type}`}>{text}</div>,
    document.getElementById('alert') as HTMLDivElement
  );
};

export default Alert;
