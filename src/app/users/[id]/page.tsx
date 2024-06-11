const DetailUserPage = (props: any) => {
  const { params } = props;
  return <div>
    id = {params?.id}
  </div>;
};

export default DetailUserPage;
