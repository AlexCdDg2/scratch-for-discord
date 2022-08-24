import * as Blockly from "blockly/core";
import BaseBlockly from "blockly";
import { registerRestrictions } from "../../../restrictions";

const blockName = "s4d_get_edit_webhook";
  const BORDER_FIELDS = ["NAME", "AVATAR", "CHANNEL"];
const BORDER_TYPES = ["String","String", "Channel"];
const names = ["name", "avatar", "channel"];
const amountOfInputs = names.length
const menuName = 'idk'


const blockData = {
    "message0": "edit webhook",
    "colour": "135cc2",
    "previousStatement": null,
    "nextStatement": null,
    "helpUrl": ""
};


Blockly.Blocks[menuName] = {
    init: function () {
        this.setColour("135cc2");
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
  const name = Blockly.JavaScript.valueToCode(block, "NAME", Blockly.JavaScript.ORDER_NONE)
const avatar = Blockly.JavaScript.valueToCode(block, "AVATAR", Blockly.JavaScript.ORDER_NONE)
    const channel = Blockly.JavaScript.valueToCode(block, "CHANNEL", Blockly.JavaScript.ORDER_NONE);

var code = `gwebhook.edit({`
    if(name) {
      code += `name: ${name},`
    }
  if(avatar) {
    code += `avatar: ${avatar},`
  }
if(channel) {
    code += `channel: ${channel}.id`
  } 
  var finalcode = `${code}}); \n`;
    return finalcode;
};

registerRestrictions(blockName, [
    {
        type: "hasparent",
        message: "RES_GET_WEBHOOK_PARENT",
        types: [
            "s4d_get_webhook_then"
        ]
    }
]);
