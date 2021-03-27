import React from "react";

export type ArticleProps = {
  headline: string;
  pundit: string;
  mugshot: string;
  flippedMugshot?: boolean;
};

const Article: React.FC<ArticleProps> = ({
  headline,
  pundit,
  mugshot,
  flippedMugshot,
}: ArticleProps) => (
  <article className="bg-centrist-header px-4 py-2 w-article font-serif">
    <header className="text-lg leading-9 break-words">
      <h1
        className="font-extralight text-4xl text-centrist-headline whitespace-pre-wrap"
        style={{ minHeight: "1em" }}
      >
        {headline}
      </h1>
      <h2
        className="font-light italic text-piss-yellow text-4xl"
        style={{ minHeight: "1em" }}
      >
        {pundit}
      </h2>

      <div className="flex justify-end -mt-8 -mb-7 overflow-hidden">
        {mugshot !== "" ? (
          <img
            src={mugshot}
            className="-mr-5 h-44"
            alt={""}
            style={flippedMugshot ? { transform: "scaleX(-1)" } : {}}
          />
        ) : (
          <div className="-mr-5 h-44"></div>
        )}
      </div>
      <div className="bg-centrist-lines" />
    </header>
  </article>
);

export default Article;
