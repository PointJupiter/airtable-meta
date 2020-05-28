export type AirtableClientOptions = {
  email: string
  password: string
  apiUrl?: string
}

export type Base = {
  id: string
  name: string
  tables: Table[]
  color: string
  icon: string
}

export type Table = {
  id: string
  name: string
  columns: Column[]
  primaryColumnName: string
  defaultView: View
  isEmptyDueToFilter: boolean
}

export interface View {
  id: string
  name: string
}

export enum ColumnType {
  Text = 'text',
  MultilineText = 'multilineText',
  RickText = 'richText',
  MultipleAttachment = 'multipleAttachment',
  Checkbox = 'checkbox',
  Select = 'select',
  MultipleSelect = 'multipleSelect',
  Collaborator = 'collaborator',
  MultiCollaborator = 'multiCollaborator',
  Date = 'date',
  Phone = 'phone',
  Number = 'number',
  Rating = 'rating',
  Formula = 'formula',
  ForeignKey = 'foreignKey',
  Lookup = 'lookup',
  Rollup = 'rollup',
  Count = 'count',
  AutoNumber = 'autoNumber',
  Barcode = 'barcode'
}

export type Column = TextColumn | MultilineTextColumn | RichTextColumn |
  MultipleAttachmentColumn | CheckboxColumn | SelectColumn | CollaboratorColumn |
  DateColumn | PhoneColumn | NumberColumn | RatingColumn | FormulaColumn |
  ForeignKeyColumn | LookupColumn | RollupColumn |
  AutoNumberColumn | BarcodeColumn

interface BaseColumn {
  id: string
  name: string
}

export type TextColumn = BaseColumn & {
  type: ColumnType.Text
  typeOptions: null | {
    validatorName: 'email' | 'url'
  }
}

export type MultilineTextColumn = BaseColumn & {
  type: ColumnType.MultilineText
  typeOptions: null
}

export type RichTextColumn = BaseColumn & {
  type: ColumnType.RickText
  typeOptions: null
}

export type MultipleAttachmentColumn = BaseColumn & {
  type: ColumnType.MultipleAttachment
  typeOptions: {
    unreversed: true
  }
}

export type CheckboxColumn = BaseColumn & {
  type: ColumnType.Checkbox
  typeOptions: {
    color: string
    icon: string
  }
}

export type SelectColumn = BaseColumn & {
  type: ColumnType.Select | ColumnType.MultipleSelect
  typeOptions: {
    choices: {
      id: string
      name: string
      color: string
    }[]
    disableColors: boolean
  }
}

export type CollaboratorColumn = BaseColumn & {
  type: ColumnType.Collaborator | ColumnType.MultiCollaborator
  typeOptions: {
    shouldNotify: boolean
  }
}

export type DateFormat = 'Local' | 'Friendly' | 'US' | 'European' | 'ISO'

export type DateTimeOptions = {
    isDateTime: false
  } | {
    isDateTime: true
    timeFormat: '12hour' | '24hour'
    timeZone: 'client' | 'UTC'
  }

export type DateColumn = BaseColumn & {
  type: ColumnType.Date
  typeOptions: {
    dateFormat: DateFormat
  } & DateTimeOptions
}

export type PhoneColumn = BaseColumn & {
  type: ColumnType.Phone
  typeOptions: null
}

export type NumberFormat = {
  format: 'integer'
} | {
  format: 'decimal' | 'percentv2'
  precision: number
} | {
  format: 'currency'
  symbol: string
} | {
  format: 'duration'
  durationFormat: 'h:mm' | 'h:mm:ss' | 'h:mm:ss.S' | 'h:mm:ss.SS' | 'h:mm:ss.SSS'
}

export type NumberColumn = BaseColumn & {
  type: ColumnType.Number
  typeOptions: NumberFormat & ({
    negative: true
  } | {
    negative: false
    validatorName: 'positive'
  })
}

export type RatingColumn = BaseColumn & {
  type: ColumnType.Rating
  typeOptions: {
    max: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
    icon: string
    color: string
  }
}

export type FormulaColumn = BaseColumn & {
  type: ColumnType.Formula
  typeOptions: any
}

export type ForeignKeyColumn = BaseColumn & {
  type: ColumnType.ForeignKey
  typeOptions: {
    foreignTableId: string
    relationship: 'one' | 'many'
    unreversed: boolean
    symmetricColumnId: string
    viewIdForRecordSelection?: string
  }
}

export type FilterSet = {
  id: string
  columnId: string
} & ({
  operator: 'contains' | 'doesNotContain' | 'filename' | 'filetype'
  value: string
} | {
  operator: 'isEmpty' | 'isNotEmpty'
  value: null
})

export type Relation = {
  relationColumnId: string
  foreignTableRollupColumnId: string
  filters?: {
    conjunction: 'and' | 'or'
    filterSet: FilterSet[]
  }
  dependencies: {
    referencedColumnIdsForValue: string[]
    referencedColumnIdsForFilters?: string[]
  }
  resultType: ColumnType
}

export type LookupColumn = BaseColumn & {
  type: ColumnType.Lookup
  typeOptions: Relation
}

export type RollupColumn = BaseColumn & {
  type: ColumnType.Rollup
  typeOptions: {
    formulaTextParsed: string
  } & Relation & NumberFormat // TODO(djelic): number is optional
}

export type CountColumn = BaseColumn & {
  type: ColumnType.Count
  typeOptions: Relation
}

export type AutoNumberColumn = BaseColumn & {
  type: ColumnType.AutoNumber
  typeOptions: {
    maxUsedAutoNumber: number
  }
}

export type BarcodeColumn = BaseColumn & {
  type: ColumnType.Barcode
  typeOptions: null
}
