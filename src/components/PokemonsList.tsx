import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeGrid as GridList } from 'react-window';

type Props = {
    renderItem: any;
    data: any;
    columns: number;
}

function PokemonsList({ renderItem, data, columns }: Props) {
  return (
    <AutoSizer style={{ width: "100%", height: "100vh" }}>
    {({ height, width }: { height: number; width: number }) => {
      const totalItems = data?.length || 100; // Use optional chaining and provide a default value

      return (
        <GridList
          height={height}
          width={width}
          columnCount={columns}
          columnWidth={width / columns}
          rowCount={Math.ceil(totalItems / columns)}
          rowHeight={100}
        >
          {renderItem}
        </GridList>
      );
    }}
  </AutoSizer>
  )
}

export default PokemonsList