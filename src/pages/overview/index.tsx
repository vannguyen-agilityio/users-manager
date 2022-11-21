import { Box, Heading } from '@chakra-ui/react';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { getUser } from 'src/service/user-service';
// Components
import { Indicator } from 'src/components/Indicator';
import { User } from 'src/models/user';

const Overview = () => {
  const {
    data = [],
    isFetching
  } = useQuery<Array<User>>(['users'], () => getUser(1));
  console.log('data', data);

  return isFetching ? (
    <Indicator />
  ) : (
    <Box>
      <Heading mb={4} color="gray.600" fontSize="20px">
        View
      </Heading>
    </Box>
  );
};

export default Overview;

export async function getStaticProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['user'], () => getUser())

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}
