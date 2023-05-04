import React, { PureComponent } from "react";
import Themable from "Components/Themable";
import Input from "Components/Input";
import { HiPlus } from "react-icons/hi";

export class MainAppComponent extends PureComponent {
  render() {
    const {
      handleSubmit,
      register,
      formState: { errors },
      getValues,
      onSubmit,
      isLoading,
      noConnection,
    } = this.props;
    return (
      <Themable>
        <form id="todo-add-form" onSubmit={handleSubmit}>
          <Input
            type="text"
            name="todo-add"
            id="Main-Todo-Add"
            placeholder="Add your ToDo in here..."
            register={register}
            getValues={getValues}
            specialIcon={{
              size: 20,
              IconOff: HiPlus,
              IconOn: HiPlus,
              isAlwaysShown: true,
            }}
            errors={errors}
            isThemed={true}
          />
        </form>
      </Themable>
    );
  }
}

export default MainAppComponent;
