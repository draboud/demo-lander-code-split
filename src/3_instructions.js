import { BLACKOUT_EXTRA } from "./0_config";
import * as global from "./0_globalVarsAndFunctions";

class instructions {
  //............................................................
  //............................................................
  //DEFINITIONS
  instructionsSection = document.querySelector(".section_instructions");
  allVidsInstructions = global.sectionInstructions.querySelectorAll(".vid");
  allCtrlBtnsInstructions = global.sectionInstructions.querySelectorAll(
    ".ctrl-btn.instructions"
  );
  currentInstructionVid;
  instructionVidTimer;
  //............................................................
  //............................................................
  //FUNCTIONS
  AddHandlerVidsInstructionsEnds = function (handler) {
    this.allVidsInstructions.forEach(function (el) {
      el.addEventListener("ended", function () {
        el.classList.remove("active");
        el.pause();
        handler();
      });
    });
  };
  AddHandlerCtrlBtnWrapperInstructions = function (handler) {
    global.ctrlBtnWrapper.addEventListener("click", (e) => {
      const clicked = e.target.closest(".ctrl-btn.instructions");
      if (!clicked) return;
      const parentElement = clicked.parentElement;
      this.currentInstructionVid = Array.prototype.indexOf.call(
        parentElement.children,
        clicked
      );
      handler();
    });
  };
  ResetToInstructionsMainScreen = function () {
    global.FlashBlackout(BLACKOUT_EXTRA);
    global.DeactivateSectionVideos();
    global.DeactivateActivateSectionText("main");
    global.DeactivateActivateSectionImage("main");
    global.DeactivateActivateCurrentCtrlButtons("instructions", false);
  };
}
export default new instructions();
