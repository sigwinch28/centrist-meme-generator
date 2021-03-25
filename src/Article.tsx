import React from 'react';

export type ArticleProps = {
  pundit: string,
  mugshot: string,
  headline: string
}

const Article: React.FC<ArticleProps> = ({ pundit, mugshot, headline }: ArticleProps) =>
  <article className="bg-centrist-header px-4 py-2 w-article font-serif">
    <header className="text-lg leading-9">
      <h1 className="font-extralight text-4xl text-centrist-headline whitespace-pre-wrap">{headline}</h1>
      <h2 className="font-light italic text-piss-yellow text-4xl">{pundit}</h2>

      <div className="flex justify-end -mt-8 -mb-7 overflow-hidden">
        {(mugshot !== "")
          ? <img src={mugshot} className="-mr-5 h-44" alt={""} />
          : <div className="-mr-5 h-44"></div>
        }
      </div>
      <div className="bg-centrist-lines" />
    </header>
  </article>

export default Article