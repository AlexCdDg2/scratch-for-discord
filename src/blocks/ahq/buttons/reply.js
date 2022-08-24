import * as Blockly from "blockly/core";
import BaseBlockly from "blockly";

const blockName = "rply_ahq_button";
  const BORDER_FIELDS = ["CONTENT", "EPHEMERAL", "BUTTON", "EMBED"];
const BORDER_TYPES = ["String","Boolean","String", ""];
const names = ["content", "ephemeral", "button", "embed"];
const amountOfInputs = names.length
const menuName = 'idk'


const blockData = {
    "message0": "reply",
    "colour": "33cc00",
    "previousStatement": null,
    "nextStatement": null,
    "inputsInline": true,
    "helpUrl": ""
};


Blockly.Blocks[menuName] = {
    init: function () {
        this.setColour("33cc00");
        this.setHelpUrl("");
    }
};
Blockly.Blocks[blockName] = {
    init: function () {
        this.jsonInit(blockData);
        this.setMutator(new Blockly.Mutator([]));
        this.inputs_ = []
        for (let i = 0; i < amountOfInputs; i++) {
            this.inputs_.push(false)
        }
    },


    mutationToDom: function () {
        if (!this.inputs_) {
            return null;
        }
        const container = document.createElement("mutation");
        for (let i = 0; i < this.inputs_.length; i++) {
            if (this.inputs_[i]) container.setAttribute(BORDER_FIELDS[i], this.inputs_[i])
        }
        return container;
    },

    domToMutation: function (xmlElement) {
        for (let i = 0; i < this.inputs_.length; i++) {
            this.inputs_[i] = xmlElement.getAttribute(BORDER_FIELDS[i].toLowerCase()) == "true";
        }
        this.updateShape_();
    },

    decompose: function (workspace) {
        const containerBlock = workspace.newBlock(menuName);
        for (let i = 0; i < this.inputs_.length; i++) {
            BaseBlockly.Msg[BORDER_FIELDS[i]] = names[i];
            containerBlock.appendDummyInput()
                .setAlign(Blockly.ALIGN_LEFT)
                .appendField(new Blockly.FieldCheckbox(this.inputs_[i] ? "TRUE" : "FALSE"), BORDER_FIELDS[i].toUpperCase())
                .appendField(names[i])
        }
        containerBlock.initSvg();
        return containerBlock;
    },

    compose: function (containerBlock) {
        // Set states
        for (let i = 0; i < this.inputs_.length; i++) {
            this.inputs_[i] = (containerBlock.getFieldValue(BORDER_FIELDS[i].toUpperCase()) == "TRUE");
        }
        this.updateShape_();
    },

    updateShape_: function () {
        for (let i = 0; i < this.inputs_.length; i++) {
            if ((!this.inputs_[i]) && (this.getInput(BORDER_FIELDS[i].toUpperCase()))) this.removeInput(BORDER_FIELDS[i].toUpperCase());
        }
        for (let i = 0; i < this.inputs_.length; i++) {
            if ((this.inputs_[i]) && (!(this.getInput(BORDER_FIELDS[i].toUpperCase())))) {
                BaseBlockly.Msg[BORDER_FIELDS[i]] = names[i];
                this.appendValueInput(BORDER_FIELDS[i].toUpperCase())
                    .setCheck(BORDER_TYPES[i])
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField(names[i]);
            }
        }
    }

};

Blockly.JavaScript[blockName] = function (block) {
  const content = Blockly.JavaScript.valueToCode(block, "CONTENT", Blockly.JavaScript.ORDER_NONE)
  const ephemeral = Blockly.JavaScript.valueToCode(block, "EPHEMERAL", Blockly.JavaScript.ORDER_NONE)
  const button = Blockly.JavaScript.valueToCode(block, "BUTTON", Blockly.JavaScript.ORDER_NONE)
    const embed = Blockly.JavaScript.valueToCode(block, "EMBED", Blockly.JavaScript.ORDER_NONE);

var ahq;
  
var code = `i.reply({`
    if(content) {
      code += `content: String(${content}),`
    }
  if(ephemeral) {
    code += `ephemeral: ${ephemeral},`
  } 
  if(button) {
    ahq = `components: [new MessageActionRow().addComponents(
            ${button.replace("'", "").replace("'", "")}
        )],`;
    code += `${ahq.replace("`", "").replace("`", "")}`
  }
if(embed) {
    code += `embeds: [${embed.replace("`", "").replace("`", "").replace("'", "").replace("'", "")}]`
  } 
  var finalcode = `${code}}); \n`;
    return finalcode;
};

