import {
  useEffect,
  useState,
  useRef,
  Fragment,
  forwardRef,
  memo
} from 'react';
import {v4 as uuidv4} from 'uuid';
import style from './style.module.scss';

interface EditInputType {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  keyWords: string[];
}
function Input(
  { value, setValue, keyWords = [] }: EditInputType,
  ref: React.LegacyRef<HTMLTextAreaElement>
) {
  const keyWordsRef = useRef(null);
  const [scrollValue, setScrollValue] = useState(0);

  const submitHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLTextAreaElement;
      if (!e.repeat && target.form) {
        target.form.submit();
      }
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (keyWordsRef.current) {
      (keyWordsRef.current as HTMLDivElement).scrollLeft = scrollValue;
    }
  }, [scrollValue]);

  return (
    <div className={style.Input}>
      <div ref={keyWordsRef} className={style.Input__keyWordsWrapper}>
        {value.split(/(#[a-z\d-]+)/gi).map((word) =>
          keyWords.includes(word) ? (
            <Fragment key={uuidv4()}>
              <span className={style.Input__keyWord}>&nbsp;{word}&nbsp;</span>
            </Fragment>
          ) : (
            <Fragment key={uuidv4()}>{word}</Fragment>
          )
        )}
      </div>
      <textarea
        className={style.Input__field}
        ref={ref}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onScroll={(e) => setScrollValue(e.currentTarget.scrollLeft)}
        onKeyDown={submitHandler}
        rows={1}
      />
    </div>
  );
}

const MemoInput = memo(forwardRef(Input));

export default MemoInput;
