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
  const [headline, setHeadline] = useState("I would be 20 points ahead.");
  const [pundit, setPundit] = useState("Jeremy Corbyn");
  const [mugshot, setMugshot] = useState("");

  const articleRef = useRef<HTMLDivElement>(null);

  const onSave = () => {
    if (articleRef.current) {
      domtoimage.toBlob(articleRef.current).then((blob: Blob) => {
        let rawName = `${pundit} _ ${headline}`;
        let safeName = rawName.replace(/[^a-z0-9]/gi, '_');
        saveAs(blob, `${safeName}.png`);
      });
    }
  }


  return (
    <div id="App" className="">
      <header className="bg-centrist-blue w-100 font-serif font-bold">
        <div className="mx-auto lg:pr-4 lg:pl-20 container">
          <h1 className="text-3xl lg:text-6xl text-white px-4 py-6">Centrist Piss Boiler</h1>
        </div>
      </header>
      <div className="mx-auto lg:pr-4 lg:pl-20 container">
        <div className="bg-centrist-header">
          <div ref={articleRef} className="inline-block">
            <Article pundit={pundit} mugshot={mugshot} headline={headline} />
          </div>
        </div>
        <Form
          headline={headline}
          onHeadlineChange={setHeadline}
          pundit={pundit}
          onPunditChange={setPundit}
          mugshot={mugshot}
          onMugshotChange={setMugshot}
        />

        <button onClick={onSave} className="GuardianTextSans-Regular bg-centrist-blue text-white br-4 rounded-full px-3 py-1 mb-4 ml-2">Save →</button>
      </div>
    </div>
  )
};

export default App;
