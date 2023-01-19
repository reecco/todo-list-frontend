import './styles.scss'

type FooterProps = {
  className?: string,
}

function Footer({ className }: FooterProps) {
  return (
    <footer className={className}>
      <p>&copy; <span>2023</span></p>
    </footer>
  );
}

export default Footer;