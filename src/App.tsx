import React, { useState, useRef } from 'react';
import Article from './Article';
import Form from './Form';

import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

import "@fontsource/merriweather/400.css"
import "@fontsource/merriweather/300.css"
import "@fontsource/merriweather/300-italic.css"
import "@fontsource/merriweather/700.css"

const App: React.FC = () => {
  const [article, setArticle] = useState({
    headline: "I would be 20 points ahead",
    pundit: "Pepe",
    mugshot: ""
  })

  const articleRef = useRef<HTMLDivElement>(null);

  const onSave = () => {
    if (articleRef.current) {
      domtoimage.toBlob(articleRef.current).then((blob: Blob) => {
        let rawName = `${article.pundit} _ ${article.headline}`;
        let safeName = rawName.replace(/[^a-z0-9]/gi, '_');
        saveAs(blob, `${safeName}.png`);
      });
    }
  }

  return (
    <div id="App" className="">
      <header className="bg-centrist-blue w-100 font-serif font-bold min-w-article">
        <div className="mx-auto lg:ml-4 lg:ml-20 container">
          <h1 className="text-3xl lg:text-6xl text-white px-4 py-6">The Gatekeeper</h1>
        </div>
      </header>
      <main className="mx-auto lg:ml-4 lg:ml-20 container min-w-article">
        <div className="bg-centrist-header">
          <div ref={articleRef} className="inline-block">
            <Article {...article} />
          </div>
        </div>
        <div className="min-w-article">
          <Form
            article={article}
            onChange={setArticle}
          />
        </div>
      </main>
      <footer className="mx-auto lg:ml-4 lg:ml-20 pl-4 pb-4 container min-w-article">
        <div>
          <button onClick={onSave} className="bg-centrist-blue text-white br-4 rounded-full px-3 py-1 mb-4">Save →</button>
        </div>
        <div>
          <a className="underline text-gray-500 hover:text-gray-700" target="blank" href={"https://twitter.com/intent/tweet?text=%40sigwinch28"}>Feedback</a>
        </div>
      </footer>
    </div>
  )
};

export default App;
