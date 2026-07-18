interface Props {
  eyebrow: string;
  title: string;
  intro?: string;
}
export function PageHeader({ eyebrow, title, intro }: Props) {
  return (
    <section className="pt-40 pb-16 md:pt-52 md:pb-24">
      <div className="container-editorial max-w-4xl">
        <div className="eyebrow animate-fade-in">
          <span className="rule-bronze mr-3" />
          {eyebrow}
        </div>
        <h1 className="mt-6 font-serif text-5xl md:text-7xl leading-[1.02] text-ivory animate-fade-up">
          {title}
        </h1>
        {intro && (
          <p className="mt-8 max-w-2xl text-lg text-ivory-muted leading-relaxed animate-fade-up">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
