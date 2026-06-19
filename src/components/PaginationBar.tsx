import { Button, FormControl, IconButton, MenuItem, Select, Stack } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import LastPageIcon from '@mui/icons-material/LastPage'

export interface PaginationBarProps {
  currentPage: number
  totalPages: number
  disabled?: boolean
  maxVisiblePages?: number
  pageSize?: number
  pageSizeOptions?: number[]
  pageSizeLabel?: string
  onPageChange: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
}

const pageButtonSx = {
  minWidth: 34,
  width: 34,
  height: 34,
  borderRadius: '50%',
  color: 'var(--ui-text)',
  p: 0,
  '&.MuiButton-contained': {
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    boxShadow: 'none',
    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.22)', boxShadow: 'none' },
  },
}

const pageIconButtonSx = {
  width: 34,
  height: 34,
  color: 'var(--ui-text)',
  '&.Mui-disabled': { color: 'var(--ui-text-tertiary)' },
}

export function PaginationBar({
  currentPage,
  totalPages,
  disabled = false,
  maxVisiblePages = 10,
  pageSize,
  pageSizeOptions = [],
  pageSizeLabel = 'Page size',
  onPageChange,
  onPageSizeChange,
}: PaginationBarProps) {
  const safeTotalPages = Math.max(1, totalPages)
  const safeCurrentPage = Math.min(Math.max(1, currentPage), safeTotalPages)
  const pageWindowStart = Math.floor((safeCurrentPage - 1) / maxVisiblePages) * maxVisiblePages + 1
  const pageWindowEnd = Math.min(safeTotalPages, pageWindowStart + maxVisiblePages - 1)
  const pageNumbers = Array.from(
    { length: pageWindowEnd - pageWindowStart + 1 },
    (_, index) => pageWindowStart + index,
  )
  const showPageSize = pageSize !== undefined && onPageSizeChange !== undefined && pageSizeOptions.length > 0

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      justifyContent="flex-end"
      alignItems={{ xs: 'stretch', md: 'center' }}
      spacing={1}
    >
      <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', justifyContent: { xs: 'flex-start', md: 'center' } }}>
        <IconButton
          size="small"
          aria-label="First page"
          disabled={safeCurrentPage <= 1 || disabled}
          onClick={() => onPageChange(1)}
          sx={pageIconButtonSx}
        >
          <FirstPageIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          aria-label="Previous page"
          disabled={safeCurrentPage <= 1 || disabled}
          onClick={() => onPageChange(safeCurrentPage - 1)}
          sx={pageIconButtonSx}
        >
          <ChevronLeftIcon fontSize="small" />
        </IconButton>
        {pageNumbers.map((pageNumber) => (
          <Button
            key={pageNumber}
            size="small"
            variant={pageNumber === safeCurrentPage ? 'contained' : 'text'}
            disabled={disabled}
            onClick={() => onPageChange(pageNumber)}
            sx={pageButtonSx}
          >
            {pageNumber}
          </Button>
        ))}
        <IconButton
          size="small"
          aria-label="Next page"
          disabled={safeCurrentPage >= safeTotalPages || disabled}
          onClick={() => onPageChange(safeCurrentPage + 1)}
          sx={pageIconButtonSx}
        >
          <ChevronRightIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          aria-label="Last page"
          disabled={safeCurrentPage >= safeTotalPages || disabled}
          onClick={() => onPageChange(safeTotalPages)}
          sx={pageIconButtonSx}
        >
          <LastPageIcon fontSize="small" />
        </IconButton>
      </Stack>
      {showPageSize && (
        <FormControl size="small" sx={{ width: 76 }}>
          <Select
            value={String(pageSize)}
            inputProps={{ 'aria-label': pageSizeLabel }}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
          >
            {pageSizeOptions.map((size) => <MenuItem key={size} value={String(size)}>{size}</MenuItem>)}
          </Select>
        </FormControl>
      )}
    </Stack>
  )
}
