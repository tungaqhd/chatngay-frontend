import _ from "lodash";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const ButtonLoading = (props) => {
  const renderContent = () => {
    if (props.isLoading) {
      const loadingProps = props.loading;
      const { messageLoading } = props;
      return (
        <Button
          {..._.omit(props, ["isLoading", "messageLoading", "isSuccess"])}
          disabled
        >
          <div className="flex items-center">
            {messageLoading}
            &nbsp;
            <CircularProgress size={20} color="secondary" {...loadingProps} />
          </div>
        </Button>
      );
    }

    return (
      <Button {..._.omit(props, ["isLoading", "messageLoading", "isSuccess"])}>
        {props.children}
      </Button>
    );
  };

  return renderContent();
};

export default ButtonLoading;
