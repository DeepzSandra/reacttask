/* eslint-disable no-undef */
import {
    crudUser
} from "../stores/userStore.js";


let component;
let frmValidate;
let checkedRes;

const createuser = () => {
    var frmData = {
        chatmsg: component.state.chatmsg,
        "ops": component.state.ops,
        status: component.state.status
    };
    console.log(frmData,"vvvvvvvvvvvvvvvvv")
    crudUser(frmData, function(res) {
        component._addNotification(res);
        if(res.status != "warning") {
            component.forceUpdate();
            component.reloadPage();
        }
    });
};


const validate = () => {
    console.log(component.addChatForm);
    frmValidate = $(component.addChatForm).validate({
        errorElement: 'div',
        errorClass: 'help-block',
        focusInvalid: false,
        ignore: "",
        highlight: function(e) {
            $(e).closest('.form-group').removeClass('has-info').addClass('has-error');
        },
        success: function(e) {
            $(e).closest('.form-group').removeClass('has-error'); //.addClass('has-info');
            $(e).remove();
        },
        invalidHandler: function(e, validator) {
            var index = $(validator.errorList[0].element).closest(".tab-pane");
            if (validator.errorList.length) {
                console.log(index);
                $('.nav-tabs a[href="#' + index.attr("id") + '"]').tab('show');
            }
        },
        rules: {
            phone: {
                required: true
            },
            firstname: {
              required: true
            },
            mailId: {
                required: true,
                email: true
            }
        },
        messages: {
            desc: {
                required: 'Please enter the name'
            }
        },
        submitHandler() {
            createuser();
        },
    });
  
};


export const handleadmin = (options) => {
    component = options.component;
    validate();
}

export const resetValidation = () => {
    frmValidate.resetForm();
    $('.form-group').removeClass('has-error');
}