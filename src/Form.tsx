import React, { useEffect, useState, useCallback } from "react";
import { ArticleProps } from "./Article";
import Button from "./Button";
import pepeSad from "./images/pepe-sad.png";
import pepeLaugh from "./images/pepe-laugh.png";

interface InputProps {
  onChange: (value: string) => void;
  disabled: boolean;
}

const FileInput: React.FC<InputProps> = ({
  onChange,
  disabled,
}: InputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files?.[0];
    if (file) {
      let url = URL.createObjectURL(file);
      onChange(url);
    }
  };

  return (
    <input
      type="file"
      disabled={disabled}
      onChange={handleChange}
      className="border-2 border-gray-400 p-2 focus:ring-4"
    />
  );
};

const UrlInput: React.FC<InputProps> = ({ onChange, disabled }: InputProps) => {
  const [url, setUrl] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleLoad = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onChange(url);
  };

  return (
    <span>
      <input
        type="text"
        disabled={disabled}
        onChange={handleChange}
        value={url}
        className="border-2 border-gray-400 p-2 focus:ring-4"
      />
      <Button onClick={handleLoad} className="ml-4 bg-centrist-blue text-white">
        Load
      </Button>
    </span>
  );
};

interface MugshotInputProps {
  onChange: (value: string) => void;
}

enum MugshotInputSource {
  None = 0,
  File,
  PepeLaugh,
  PepeSad,
  URL,
}

const MugshotInput: React.FC<MugshotInputProps> = ({
  onChange,
}: MugshotInputProps) => {
  const [currentSource, setCurrentSource] = useState(
    MugshotInputSource.PepeLaugh
  );
  const [url, setUrl] = useState("");
  const [file, setFile] = useState("");

  useEffect(() => {
    switch (currentSource) {
      case MugshotInputSource.None:
        onChange("");
        break;
      case MugshotInputSource.PepeLaugh:
        onChange(pepeLaugh);
        break;
      case MugshotInputSource.PepeSad:
        onChange(pepeSad);
        break;
      case MugshotInputSource.File:
        onChange(file);
        break;
      case MugshotInputSource.URL:
        onChange(url);
        break;
    }
  }, [onChange, currentSource, url, file]);

  const inputs = [
    {
      source: MugshotInputSource.None,
      label: "None",
      input: null,
    },
    {
      source: MugshotInputSource.PepeLaugh,
      label: "Lauging Pepe",
      input: null,
    },
    {
      source: MugshotInputSource.PepeSad,
      label: "Sad Pepe",
      input: null,
    },
    {
      source: MugshotInputSource.URL,
      label: "URL",
      input: (
        <UrlInput
          disabled={currentSource !== MugshotInputSource.URL}
          onChange={setUrl}
        />
      ),
    },
    {
      source: MugshotInputSource.File,
      label: "File",
      input: (
        <FileInput
          disabled={currentSource !== MugshotInputSource.File}
          onChange={setFile}
        />
      ),
    },
  ];

  return (
    <div>
      <p className="italic">
        Please use an image with a transparent background
      </p>
      {inputs.map(({ source, label, input }) => (
        <div key={source} className="my-4">
          <label className="pr-2">
            <input
              type="radio"
              name="source"
              value={source}
              checked={source === currentSource}
              onChange={() => setCurrentSource(source)}
              className="mr-1"
            />
            {label}
          </label>
          {input}
        </div>
      ))}
    </div>
  );
};

interface FormProps {
  article: ArticleProps;
  onChange: React.Dispatch<React.SetStateAction<ArticleProps>>;
}

const Form: React.FC<FormProps> = ({ article, onChange }: FormProps) => {
  const handleHeadlineChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange((article) => ({ ...article, headline: e.target.value }));
    },
    [onChange]
  );

  const handlePunditChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange((article) => ({ ...article, pundit: e.target.value }));
    },
    [onChange]
  );

  const handleMugshotChange = useCallback(
    (mugshot: string) => {
      onChange((article) => ({ ...article, mugshot: mugshot }));
    },
    [onChange]
  );

  return (
    <form className=" border-t border-b lg:border-l lg:border-r px-4 p-4 my-4 text-lg">
      <h2 className="font-bold mb-1">Headline</h2>
      <input
        type="text"
        value={article.headline}
        onChange={handleHeadlineChange}
        className="border-2 border-gray-400 p-2 focus:ring-4"
      />
      <br />
      <h2 className="font-bold mt-4 mb-1">Pundit Name</h2>
      <input
        type="text"
        value={article.pundit}
        onChange={handlePunditChange}
        className="border-2 border-gray-400 p-2 focus:ring-4"
      />
      <h2 className="font-bold mt-4 mb-1">Pundit Mugshot</h2>
      <MugshotInput onChange={handleMugshotChange} />
    </form>
  );
};

export default Form;
