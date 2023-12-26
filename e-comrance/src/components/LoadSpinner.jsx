import { Spin } from "@antd";
import { LoadingOutlined } from "@ant-design/icons";

const Spinner = ({ loading, spinTip }) => {
  return (
    <div>
      <Spin
        spinning={loading}
        fullscreen
        tip={spinTip}
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 24,
            }}
            spin
          />
        }
      >
        <div className="content" />
      </Spin>
    </div>
  );
};

export default Spinner;
