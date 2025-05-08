import loudlyCrying from "./loudly-crying.json";
import skull from "./skull.json";
import seeNoEvilMonkey from "./see-no-evil-monkey.json";
import winkyTongue from "./winky-tongue.json";
import holdingBackTears from "./holding-back-tears.json";


export enum Emoji {
  LoudlyCrying,
  Skull,
  SeeNoEvilMonkey,
  WinkyTongue,
  HoldingBackTears,
}

export const emojiAnimations: { [key in Emoji]?: any } = {
  [Emoji.LoudlyCrying]: loudlyCrying,
  [Emoji.Skull]: skull,
  [Emoji.SeeNoEvilMonkey]: seeNoEvilMonkey,
  [Emoji.WinkyTongue]: winkyTongue,
  [Emoji.HoldingBackTears]: holdingBackTears,
};
