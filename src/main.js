console.log("tester Oct 16");
//.......................................................................
//.......................................................................
//IMPORTS
import {
  BLACKOUT_INIT,
  BLACKOUT_STANDARD,
  DELAY_BEFORE_FEATURE_TEXT,
  INSTRUCTION_VIDS_LOOPING,
  NO_OF_INSTRUCTION_VIDS,
  PAUSE_BETWEEN_INSTRUCTION_VIDS,
} from "./0_config";
import * as global from "./0_globalVarsAndFunctions";
import initialize from "./initialize";
import features from "./1_features";
import components from "./2_components";
import instructions from "./3_instructions";

//.......................................................................
//.......................................................................
//INITIALIZE
const MainAllCtrlBtnsMouseEnter = function (ctrlBtn) {
  ctrlBtn.classList.add("hovered");
};
const MainAllCtrlBtnsMouseLeave = function (ctrlBtn) {
  ctrlBtn.classList.remove("hovered");
};
const MainAllNavLinks = function (navLink) {
  global.SetActiveSectionName(navLink.classList[1]);
  global.SetActiveSection(
    document.querySelector(`.section_${global.activeSectionName}`)
  );
  initialize.ActivateNavLink();
  initialize.ResetSectionSpecial();
  global.ResetSectionVideos("all");
  global.DeactivateActivateSectionText("main");
  global.ActivateSection();
  global.ActivateSectionButtons();
  if (global.activeSectionName === "features") global.PlaySectionVideo("main");
};
//.......................................................................
//.......................................................................
//FEATURES
const MainFeaturesVidsEnds = function () {
  features.ResetToFeaturesMainScreen();
};
const MainCtrlBtnsFeatures = function () {
  global.FlashBlackout(BLACKOUT_STANDARD);
  global.DeactivateActivateSectionText();
  global.DeactivateActivateSectionImage();
  global.ResetSectionVideos();
  global.ActivateSectionVideo("features", global.ctrlBtnIndex);
  global.PlaySectionVideo("features", global.ctrlBtnIndex);
  global.DeactivateActivateCurrentCtrlButtons("features", global.ctrlBtnIndex);
  setTimeout(function () {
    global.DeactivateActivateSectionText("feature", global.ctrlBtnIndex);
  }, DELAY_BEFORE_FEATURE_TEXT);
};
//.......................................................................
//.......................................................................
//COMPONENTS
const MainVidsComponentDatasheetsEnds = function () {
  components.DisplayDataSheet();
};
const MainBackBtn = function () {
  global.ResetSectionVideos("components", "datasheets");
  global.DeactivateActivateSectionImage(components.currentViewName);
  components.dimmer.classList.remove("active");
  components.ActivateDeactivateDatasheetTextAndButtons(false);
  global.DeactivateActivateSectionText("main");
  global.ActivateSection();
  global.ActivateSectionButtons();
};
const MainCtrlBtnsComponents = function () {
  global.DeactivateActivateSectionText();
  global.DeactivateActivateSectionImage();
  global.ResetSectionVideos();
  global.ActivateSectionVideo("datasheets", global.ctrlBtnIndex);
  global.PlaySectionVideo("datasheets", global.ctrlBtnIndex);
  components.ctrlBtnWrapperComponents.classList.remove("active");
};
const MainMenuBtn = function () {
  components.optsMenu.classList.add("active");
};
const MainOptsMenuBtn = function (clickedBtnContent) {
  components.optsMenu.classList.remove("active");
  if (global.GetCurrentViewName() !== clickedBtnContent) {
    global.SetCurrentViewName(clickedBtnContent);
    components.optsMenuBtn.textContent = global.GetCurrentViewName();
    global.SetCtrlBtnIndex("");
    global.DeactivateActivateSectionText();
    global.DeactivateActivateSectionImage();
    global.ResetSectionVideos();
    global.ActivateSectionVideo(global.GetCurrentViewName());
    global.PlaySectionVideo(global.GetCurrentViewName());
    components.ctrlBtnWrapperComponents.classList.remove("active");
  }
};
const MainComponentVidsViewsEnds = function () {
  global.DeactivateActivateSectionImage(
    components.currentViewName,
    global.ctrlBtnIndex
  );
  global.DeactivateActivateSectionText("main");
  components.ctrlBtnWrapperComponents
    .querySelectorAll(".ctrl-btn")
    .forEach(function (el) {
      el.classList.remove("active");
    });
  global.DeactivateActivateCtrlBtnRange(
    "components",
    global.startBtnRange,
    global.endBtnRange
  );
  components.ctrlBtnWrapperComponents.classList.add("active");
};
const MainTextImgBtn = function () {
  components.textImgBtnLabel === "image"
    ? (components.textImgBtn.textContent = "text")
    : (components.textImgBtn.textContent = "image");
  components.textImgBtnLabel = components.textImgBtn.textContent;
  components.activeDatasheet
    .querySelector(".comp-data-body-wrap")
    .classList.toggle("active");
  components.dimmer.classList.toggle("active");
};
//.......................................................................
//.......................................................................
//INSTRUCTIONS
const MainInstructionsVidsEnds = function () {
  instructions.instructionVidTimer = setTimeout(function () {
    instructions.currentInstructionVid += 1;
    if (
      instructions.currentInstructionVid === NO_OF_INSTRUCTION_VIDS &&
      INSTRUCTION_VIDS_LOOPING
    ) {
      instructions.currentInstructionVid = 0;
    } else if (
      instructions.currentInstructionVid === NO_OF_INSTRUCTION_VIDS &&
      !INSTRUCTION_VIDS_LOOPING
    ) {
      instructions.ResetToInstructionsMainScreen();
      return;
    }
    global.FlashBlackout(BLACKOUT_STANDARD);
    global.ActivateSectionVideo(
      "instructions",
      instructions.currentInstructionVid
    );
    global.PlaySectionVideo("instructions", instructions.currentInstructionVid);
    global.DeactivateActivateCurrentCtrlButtons(
      "instructions",
      instructions.currentInstructionVid
    );
  }, PAUSE_BETWEEN_INSTRUCTION_VIDS);
};
const MainCtrlBtnsInstructions = function () {
  clearTimeout(instructions.instructionVidTimer);
  // global.SetInstructionVidTimer(null);
  instructions.instructionVidTimer = null;
  global.FlashBlackout(BLACKOUT_STANDARD);
  global.ActivateSectionVideo(
    "instructions",
    instructions.currentInstructionVid
  );
  global.ResetSectionVideos();
  global.DeactivateActivateSectionText();
  global.DeactivateActivateSectionImage();
  global.PlaySectionVideo("instructions", instructions.currentInstructionVid);
  global.DeactivateActivateCurrentCtrlButtons(
    "instructions",
    instructions.currentInstructionVid
  );
};
//.......................................................................
//.......................................................................
//INITIALIZE
const init = function () {
  initialize.AddHandlerAllCtrlBtnsMouseEnter(MainAllCtrlBtnsMouseEnter);
  initialize.AddHandlerAllCtrlBtnsMouseLeave(MainAllCtrlBtnsMouseLeave);
  initialize.AddHandlerAllNavLinks(MainAllNavLinks);
  features.AddHandlerVidsFeaturesEnd(MainFeaturesVidsEnds);
  components.AddHandlerVidsComponentDatasheetsEnds(
    MainVidsComponentDatasheetsEnds
  );
  features.AddHandlerCtrlBtnWrapperFeatures(MainCtrlBtnsFeatures);
  components.AddHandlerMenuBtn(MainMenuBtn);
  components.AddHandlerOptsMenu(MainOptsMenuBtn);
  components.AddHandlerBackBtn(MainBackBtn);
  components.AddHandlerVidsComponentViewsEnds(MainComponentVidsViewsEnds);
  components.AddHandlerTextImgBtn(MainTextImgBtn);
  components.AddHandlerCtrlBtnWrapperComponents(MainCtrlBtnsComponents);
  instructions.AddHandlerVidsInstructionsEnds(MainInstructionsVidsEnds);
  instructions.AddHandlerCtrlBtnWrapperInstructions(MainCtrlBtnsInstructions);
  //.......................................................................
  //.......................................................................
  //LOADER
  global.blackout.classList.remove("off");
  global.loader.classList.add("active");
  global.navBar.style.display = "none";
  global.ctrlBtnWrapper.classList.remove("active");
};
init();
window.addEventListener("load", function () {
  global.navLinkInstructions.click();
  global.navLinkComponents.click();
  global.navLinkFeatures.click();
  this.setTimeout(function () {
    global.navBar.style.display = "block";
    global.ctrlBtnWrapper.classList.add("active");
    global.SetInitializing(false);
    global.loader.classList.remove("active");
    global.blackout.classList.add("off");
  }, BLACKOUT_INIT);
});
