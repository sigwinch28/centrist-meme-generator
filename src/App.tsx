import React, { useState, useRef } from "react";
import Article from "./Article";
import Button from "./Button";
import Form from "./Form";

import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

import "@fontsource/merriweather/400.css";
import "@fontsource/merriweather/300.css";
import "@fontsource/merriweather/300-italic.css";
import "@fontsource/merriweather/700.css";

const links = [
  {
    href: "https://twitter.com/intent/tweet?text=%40sigwinch28%20",
    children: "Feedback",
  },
  {
    href: "https://github.com/sigwinch28/centrist-meme-generator",
    children: "Source code",
  },
];

const App: React.FC = () => {
  const [article, setArticle] = useState({
    headline: "ouuuh i just got 20 points ahead",
    pundit: "Pepe the Frog",
    mugshot: "",
  });

  const articleRef = useRef<HTMLDivElement>(null);

  const onSave = async () => {
    if (articleRef.current) {
      let ref = articleRef.current;
      // call twice because of Safari security issues. Weird.
      await domtoimage
        .toBlob(ref)
        .then((_) => domtoimage.toBlob(ref))
        .then((blob: Blob) => {
          let rawName = `${article.pundit} _ ${article.headline}`;
          let safeName = rawName.replace(/[^a-z0-9]/gi, "_");
          saveAs(blob, `${safeName}.png`);
        });
    }
  };

  return (
    <div id="App" className="">
      <header className="bg-centrist-blue w-100 font-serif font-bold min-w-article">
        <div className="mx-auto lg:ml-4 lg:ml-20 container">
          <h1 className="text-3xl lg:text-6xl text-white px-4 py-6">
            The Gatekeeper
          </h1>
        </div>
      </header>
      <main className="mx-auto lg:ml-4 lg:ml-20 container min-w-article">
        <div className="bg-centrist-header py-2">
          <div ref={articleRef} className="inline-block">
            <Article {...article} />
          </div>
        </div>
        <div className="min-w-article">
          <Form article={article} onChange={setArticle} />
        </div>
      </main>
      <footer className="mx-auto lg:ml-4 lg:ml-20 pl-4 my-2 container min-w-article">
        <div>
          <Button onClick={onSave}>Save →</Button>
        </div>
        <div className="mt-4">
          {links.map(({ href, children }, i) => (
            <span>
              <a
                key={i}
                className={
                  "underline text-gray-500 hover:text-gray-700 " +
                  (i > 0 && "ml-4")
                }
                target="blank"
                href={href}
              >
                {children}
              </a>
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default App;
