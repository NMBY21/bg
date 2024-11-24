import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  Select,
  Table,
  Input,
  Tag,
  Tooltip,
  message,
  Button,
  Pagination,
  Divider,
  Avatar,
  Image,
  List,
  Skeleton,
  Row,
  Col,
} from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  FormOutlined,
  SafetyOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
// import MediaView from './MediaView';
import { fetchMedia, DeleteMedia } from "store/slices/MediasSlice";
import Flex from "components/shared-components/Flex";
import { IMAGE_API_BASE_URL, IMAGE_FALLBACK_URL } from "configs/AppConfig";
import Meta from "antd/es/card/Meta";
import Loading from "components/shared-components/Loading";
import MediaForm from './MediaForm';

export const MediaList = () => {
  const dispatch = useDispatch();
  const [media, setMedia] = useState([]);
  const [mediaProfileVisible, setProfile] = useState(false);
  const [selectedMedia, setselectedMedia] = useState(null);
  const mediaValue = useSelector((state) => state.media);
  const [formVisible, setFormVisible] = useState(false);
  const [mediaEditVisible, setEditFormVisible] = useState(false);
  const [roleformVisible, setassignRoleFormVisible] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  useEffect(() => {
    var payload = {
      pageSize: pageSize,
      pageNumber: pageIndex,
    };
    fetch(payload);
  }, []);

  const fetch = (payload) => {
    dispatch(fetchMedia(payload));
  };

  const deleteMedia = (mediaId) => {
    var payload = {
      pageSize: pageSize,
      pageNumber: pageIndex,
    };
    dispatch(DeleteMedia(mediaId))
      .unwrap()
      .then(() => dispatch(fetchMedia(payload)).unwrap());
  };

  const showMediaProfile = (mediaInfo) => {
    setProfile(true);
    setselectedMedia(mediaInfo);
  };

  const closeMediaEdit = () => {
    setEditFormVisible(false);
    setselectedMedia(null);
  };

  const showMediaEdit = (mediaInfo) => {
    setEditFormVisible(true);
    setselectedMedia(mediaInfo);
  };

  const closeMediaProfile = () => {
    setProfile(false);
    setselectedMedia(null);
  };

  const showForm = () => {
    setFormVisible(true);
  };

  const closeForm = () => {
    setFormVisible(false);
  };

  const resetPageSize = () => {
    setPageIndex(1);
    setPageSize(12);
  };
  return (
    <>
      <Card>
        {/* <Flex
          alignItems="center"
          justifyContent="space-between"
          mobileFlex={false}
        > */}
          {/* <Flex className="mb-1" mobileFlex={true}> */}

          <Row gutter={16}>
            <Col xs={24} sm={8} md={12}>
              <div className="mr-md-3 mb-3">
                <Input placeholder="Search" prefix={<SearchOutlined />} />
              </div>
            </Col>
            <Col xs={24} sm={8} md={6}>
              <div className="mr-md-3 mb-3">
                <Button 
                
                  icon={<SearchOutlined />}
                  block
                >
                  Search Media
                </Button>
              </div>
            </Col>
            <Col xs={24} sm={8} md={6}>
              <div className="mr-md-3 mb-3">
                <Button s
                  onClick={(e) => showForm()}
                  type="primary"
                  icon={<PlusCircleOutlined />}
                  block
                >
                  Add Media
                </Button>
              </div>
            </Col>
          </Row>
          {/* </Flex> */}
        {/* </Flex> */}

        <div>
          <List
            loading={mediaValue.loading}
            grid={{
              gutter: 24,
              span: 24,
              xs: 2,
              sm: 2,
              md: 4,
              lg: 6,
              xl: 6,
              xxl: 6,
            }}
            dataSource={mediaValue.Medias}
            renderItem={(item) => (
              <List.Item>
                <Card
                  size="small"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Avatar
                    shape="square"
                    size={150}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      background: "white",
                    }}
                    icon={
                      <Image
                        placeholder={() => {
                          <Loading></Loading>;
                        }}
                        style={{
                          // objectFit: "contain",
                          background: "white",
                          height: "150px",
                          width: "150px",
                          objectFit: "contain",
                        }}
                        src={IMAGE_API_BASE_URL + item.imageUrl}
                        fallback={IMAGE_FALLBACK_URL}
                      />
                    }
                  />
                  {/* <Meta
      description={`Title : ${item.imageName} `} 
    /> */}
                </Card>
              </List.Item>
            )}
          />
          <br></br>
          <br></br>
          <Pagination
            loading={mediaValue.loading}
            current={pageIndex}
            total={mediaValue.metadata?.totalRecords}
            onChange={(page, size) => {
              setPageIndex(page);
              setPageSize(size);
              var payload = {
                pageSize: size,
                pageNumber: page,
              };
              {console.log(payload)}
              fetch(payload);
            }}
          />
        </div>
        {/* {mediaProfileVisible && <MediaView data={selectedMedia} visible={mediaProfileVisible} close={() => { closeMediaProfile() }} />} */}
        {/* {mediaEditVisible && <MediaEdit data={selectedMedia} visible={mediaEditVisible} close={() => { closeMediaEdit() }} />} */}

			{formVisible &&	<MediaForm visible={formVisible} close={() => { closeForm() }} callbackFn={resetPageSize} /> }
      
      </Card>
    </>
  );
};

export default MediaList;
