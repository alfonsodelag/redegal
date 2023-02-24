import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "../../components/container";
import { DetailLayout } from "../../components/index";
import Table from "../../components/podcast-detail-table";
import { podcastApi } from "../../services/podcast";
import { formatDate } from "../../utils/format-date";
import { formatSeconds } from "../../utils/format-seconds";

const PodcastDetail = () => {
  const { podcastId } = useParams();
  const {
    data: ptmr,
    isLoading,
    isSuccess,
  } = podcastApi.useGetPodcastByIdQuery(podcastId);
  const podcastDetail = ptmr && JSON.parse(ptmr.contents);
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Duration",
        accessor: "duration",
      },
    ],
    []
  );

  const data =
    isSuccess &&
    podcastDetail?.results?.map((podcast) => ({
      id: podcast.trackId,
      title: podcast.trackName,
      date: formatDate(podcast.releaseDate),
      duration: formatSeconds(podcast.trackTimeMillis),
    }));

  const handleRowClick = (row) => {
    navigate(`/podcast/${podcastId}/episode/${row.id}`);
  };

  return (
    <DetailLayout>
      <Container sx={{ marginBottom: 16 }}>
        <h2> Episodes: 66</h2>
      </Container>
      <Container>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <Table
            handleRowClick={handleRowClick}
            data={data}
            columns={columns}
          />
        )}
      </Container>
    </DetailLayout>
  );
};

export default PodcastDetail;
