import React, { useEffect, useReducer, useCallback, useState } from "react";
import Button from "./Button";

import pepeSad from "./images/pepe-sad.png";
import pepeLaugh from "./images/pepe-laugh.png";

const presets: [string, string][] = [
  ["Sad Pepe", pepeSad],
  ["Laughing Pepe", pepeLaugh],
];

const headlines = ["ouuuh i just got 20 points ahead", "Ding Dong x"];
const pundits = ["Pepe the Frog", "Your Mum", "Your Da", "Keith", "Kieth"];

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

interface FieldProps {
  label: React.ReactNode;
}

const Field: React.FC<FieldProps> = ({ label, children }) => (
  <div className="mt-2">
    <h2 className="font-bold mb-1">{label}</h2>
    {children}
  </div>
);

interface TextInputProps {
  onChange: (value: string) => void;
  disabled?: boolean;
  value?: string;
}

const TextInput: React.FC<TextInputProps> = ({ onChange, ...props }) => (
  <input
    type="text"
    autoComplete="off"
    autoCorrect="off"
    autoCapitalize="off"
    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
      onChange && onChange(e.target.value)
    }
    className="border-2 border-gray-400 p-2 focus:ring-4"
    {...props}
  />
);

interface RandomTextInputProps extends TextInputProps {
  onClick: () => void;
}

const RandomTextInput: React.FC<RandomTextInputProps> = ({
  onClick,
  onChange,
  ...props
}) => {
  const [tainted, setTainted] = useState(false);

  const inputHandler = (value: string) => {
    setTainted(true);
    onChange(value);
  };

  const buttonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!tainted || window.confirm("Are you sure?")) {
      setTainted(false);
      onClick();
    }
  };

  return (
    <span>
      <TextInput {...props} onChange={inputHandler}></TextInput>
      <Button
        disabled={props.disabled}
        onClick={buttonHandler}
        className="ml-4"
      >
        Random
      </Button>
    </span>
  );
};

const HeadlineInput: React.FC<TextInputProps> = ({ onChange, ...props }) => {
  const clickHandler = () => {
    onChange(randomElement(headlines));
  };

  return (
    <RandomTextInput {...props} onChange={onChange} onClick={clickHandler} />
  );
};

const PunditInput: React.FC<TextInputProps> = ({ onChange, ...props }) => {
  const clickHandler = () => {
    onChange(randomElement(pundits));
  };

  return (
    <RandomTextInput {...props} onChange={onChange} onClick={clickHandler} />
  );
};

interface RadioButtonProps {
  name: string;
  value: string;
  label: React.ReactNode;
  checked?: boolean;
  onChange?: (value: string) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  onChange,
  children,
  ...props
}) => (
  <div className="my-2">
    <label className="mr-2">
      <input
        type="radio"
        className="mr-2"
        {...props}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange && onChange(e.target.value)
        }
      />
      {label}
    </label>
    {children}
  </div>
);

interface InputProps {
  onChange: (value: string) => void;
  disabled: boolean;
}

const PresetInput: React.FC<InputProps> = ({
  onChange,
  disabled,
}: InputProps) => (
  <select
    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
      onChange(e.target.value)
    }
    disabled={disabled}
  >
    {presets.map(([name, value], i) => (
      <option key={i} value={value}>
        {name}
      </option>
    ))}
  </select>
);

const URLInput: React.FC<InputProps> = ({ onChange, disabled }: InputProps) => {
  const [tainted, setTainted] = useState(false);
  const [url, setUrl] = useState("");
  const handleChange = (value: string) => {
    setUrl(value);
    setTainted(true);
  };

  const handleLoad = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onChange(url);
    setTainted(false);
  };

  return (
    <span>
      <TextInput disabled={disabled} onChange={handleChange} value={url} />
      <Button
        onClick={handleLoad}
        className="ml-4"
        disabled={disabled || !tainted}
        bgColor={disabled || !tainted ? "gray-500" : null}
        hoverBgColor={disabled || !tainted ? "gray-500" : null}
      >
        Load
      </Button>
    </span>
  );
};

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

interface MugshotInputProps {
  onChange: (mugshot: string) => void;
}

enum MugshotSource {
  None = "none",
  Preset = "preset",
  File = "file",
  URL = "url",
}

const MugshotInput: React.FC<MugshotInputProps> = ({ onChange }) => {
  type Action =
    | { kind: "setSource"; source: MugshotSource }
    | { kind: MugshotSource.Preset; value: string }
    | { kind: MugshotSource.File; value: string }
    | { kind: MugshotSource.URL; value: string };

  interface State {
    current: string;
    source: MugshotSource;
    values: {
      none: string;
      preset: string;
      file: string;
      url: string;
    };
  }

  const reducer = (state: State, action: Action): State => {
    // Okay, so this is kind of grim but I also love it.
    //
    // If the source is changed, we:
    // * update `state.source`
    // * set `state.current = state.values[source]`
    //
    // If a value is changed, we:
    // * set `state.values[source]` to that value
    // * set `state.current` to that value if (and only if) `state.source === source`
    switch (action.kind) {
      case "setSource":
        return {
          ...state,
          source: action.source,
          current: state.values[action.source],
        };
      default:
        if (state.source === action.kind) {
          return {
            ...state,
            values: { ...state.values, [action.kind]: action.value },
            current: action.value,
          };
        } else {
          return {
            ...state,
            values: { ...state.values, [action.kind]: action.value },
          };
        }
    }
  };

  // Default to the first preset
  const initialState: State = {
    current: presets[0][1],
    source: MugshotSource.Preset,
    values: {
      none: "",
      preset: presets[0][1],
      file: "",
      url: "",
    },
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // Call the `onChange` whenever our state changes.
  // Really the handler should only be called when `state.current` changes,
  // but I can't see how to do that.
  useEffect(() => {
    onChange(state.current);
  }, [state, onChange]);

  const radioHandler = (source: MugshotSource) => () => {
    dispatch({ kind: "setSource", source: source });
  };
  return (
    <div>
      <RadioButton
        name="source"
        value={MugshotSource.None}
        checked={state.source === MugshotSource.None}
        onChange={radioHandler(MugshotSource.None)}
        label="None"
      />
      <RadioButton
        name="source"
        value={MugshotSource.Preset}
        checked={state.source === MugshotSource.Preset}
        onChange={radioHandler(MugshotSource.Preset)}
        label="Preset"
      >
        <PresetInput
          onChange={(value: string) => {
            dispatch({ kind: MugshotSource.Preset, value: value });
          }}
          disabled={state.source !== MugshotSource.Preset}
        />
      </RadioButton>
      <RadioButton
        name="source"
        value={MugshotSource.URL}
        checked={state.source === MugshotSource.URL}
        onChange={radioHandler(MugshotSource.URL)}
        label="URL"
      >
        <URLInput
          onChange={(value: string) =>
            dispatch({ kind: MugshotSource.URL, value: value })
          }
          disabled={state.source !== MugshotSource.URL}
        />
      </RadioButton>
      <RadioButton
        name="source"
        value={MugshotSource.File}
        checked={state.source === MugshotSource.File}
        onChange={radioHandler(MugshotSource.File)}
        label="File"
      >
        <FileInput
          onChange={(value: string) =>
            dispatch({ kind: MugshotSource.File, value: value })
          }
          disabled={state.source !== MugshotSource.File}
        />
      </RadioButton>
    </div>
  );
};

interface FormProps {
  headline: string;
  pundit: string;
  mugshot: string;
  onChange: (key: "headline" | "pundit" | "mugshot", value: string) => void;
}

const Form: React.FC<FormProps> = ({ headline, pundit, onChange }) => {
  const headlineChangeHandler = useCallback(
    (value: string) => onChange("headline", value),
    [onChange]
  );

  const punditChangeHandler = useCallback(
    (value: string) => onChange("pundit", value),
    [onChange]
  );

  const mugshotChangeHandler = useCallback(
    (value: string) => onChange("mugshot", value),
    [onChange]
  );

  return (
    <form>
      <Field label="Hot take">
        <HeadlineInput value={headline} onChange={headlineChangeHandler} />
      </Field>
      <Field label="Pundit">
        <PunditInput value={pundit} onChange={punditChangeHandler} />
      </Field>
      <Field label="Mugshot">
        <MugshotInput onChange={mugshotChangeHandler} />
      </Field>
    </form>
  );
};

export default Form;
