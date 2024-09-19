import { Shell } from '@/components/shells/shell';

function SiteFooter() {
  return (
    <footer className="w-full border-t bg-background">
      <Shell as="div">
        <section
          aria-labelledby="footer-content-heading"
          className="flex flex-col gap-10 lg:flex-row lg:gap-20 items-center justify-center lg:justify-between"
        >
          <div>
            © {new Date().getFullYear()} All rights reserved by Illustry
          </div>
        </section>
      </Shell>
    </footer>
  );
}

export default SiteFooter;
