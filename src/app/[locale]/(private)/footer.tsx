export default function Footer() {
  const dateTime = new Date();

  return (
    <footer className="text-slate-700 dark:text-slate-600">
      &copy; Next13 {dateTime.getFullYear()}
    </footer>
  );
}
