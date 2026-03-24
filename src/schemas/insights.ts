import { z } from 'zod';

const measureValues = [
  'Requests.count',
  'Requests.first_response_request_count',
  'Requests.response_times_avg',
  'Requests.response_times_p50',
  'Requests.response_times_p75',
  'Requests.response_times_p90',
  'Requests.response_times_p95',
  'Requests.resolution_time',
  'Requests.first_response_sla_breached',
  'Requests.resolution_time_sla_breached',
  'Requests.first_response_time_avg',
  'Requests.first_response_time_p50',
  'Requests.first_response_time_p75',
  'Requests.first_response_time_p90',
  'Requests.first_response_time_p95',
  'Requests.resolution_time_avg',
  'Requests.resolution_time_p50',
  'Requests.resolution_time_p75',
  'Requests.resolution_time_p90',
  'Requests.resolution_time_p95',
  'Requests.first_response_sla_breached_percent',
  'Requests.resolution_time_sla_breached_percent',
  'Requests.first_resolution_time_avg',
  'Requests.first_resolution_time_p50',
  'Requests.first_resolution_time_p75',
  'Requests.first_resolution_time_p90',
  'Requests.first_resolution_time_p95',
  'Requests.one_touch_resolution_breached',
  'Requests.one_touch_resolution_breached_percent',
  'Requests.requests_in_solved_state',
  'Requests.first_resolution_requests_count',
  'Requests.resolution_time_sla_request_count',
  'Requests.first_response_time_sla_request_count',
  'Requests.one_touch_resolution_sla_request_count',
  'Requests.sage_trigger_count',
  'Requests.sage_positive_feedback_count',
  'Requests.sage_negative_feedback_count',
  'Requests.sage_response_count',
  'Requests.sage_answer_count',
  'Requests.csat_triggered_request_count',
  'Requests.csat_received_request_count',
  'Requests.csat_response_percent',
  'Requests.csat_score_avg',
  'Requests.csat_score_p50',
  'Requests.csat_score_p75',
  'Requests.csat_score_p90',
  'Requests.csat_score_p95',
  'Requests.resolution_rate_percent',
  'Requests.resolved_requests_count',
  'Requests.csat_received_request_count_two_point_survey',
  'Requests.csat_two_point_positive_responses_count',
  'Requests.csat_two_point_negative_responses_count'
] as const;

const dimensionValues = [
  'Requests.state',
  'Requests.assignee_user_id',
  'Requests.customer_id',
  'Requests.customer_owner',
  'Requests.priority',
  'Requests.csat_score',
  'Requests.slack_channel_name',
  'Requests.collection_id'
] as const;

const filterMemberValues = [
  'Requests.created_at',
  'Requests.state',
  'Requests.has_ticket',
  'Requests.priority',
  'Requests.is_csat_triggered',
  'Requests.csat_two_point_survey_value'
] as const;

const timeDimensionValues = ['Requests.created_at', 'Requests.csat_triggered_at'] as const;

const operatorValues = [
  'equals',
  'not_equals',
  'contains',
  'not_contains',
  'gt',
  'gte',
  'lt',
  'lte',
  'set',
  'not_set',
  'in_date_range',
  'before_date',
  'after_date'
] as const;

const granularityValues = ['year', 'quarter', 'week', 'month', 'day'] as const;

const externalFilterSchema = z.object({
  member: z
    .union([z.enum(filterMemberValues), z.string().min(1)])
    .describe(
      'Field to filter on. Supports built-in request fields and custom fields like Stories.custom_field_<id>.'
    ),
  operator: z.enum(operatorValues),
  values: z
    .array(z.union([z.string(), z.null()]))
    .optional()
    .describe('Optional operator values. Omit for operators like `set` and `not_set`.')
});

const externalTimeDimensionSchema = z.object({
  dimension: z
    .enum(timeDimensionValues)
    .describe('Time field to group or constrain by, such as Requests.created_at.'),
  granularity: z
    .enum(granularityValues)
    .optional()
    .describe('Optional bucket size for grouping, such as day, week, or month.'),
  date_range: z
    .union([z.string(), z.tuple([z.string(), z.string()])])
    .optional()
    .describe('Optional relative or absolute date range, for example `Last 30 days` or `[start, end]`.')
});

const externalCubeQuerySchema = z
  .object({
    measures: z
      .array(z.enum(measureValues))
      .min(1)
      .describe('One or more metrics to return, such as request counts, SLA breaches, or response-time percentiles.'),
    time_dimensions: z
      .array(externalTimeDimensionSchema)
      .min(1)
      .describe('At least one time dimension is required for every insights query.'),
    dimensions: z
      .array(z.union([z.enum(dimensionValues), z.string().min(1)]))
      .optional()
      .default([])
      .describe(
        'Optional grouping fields. Supported request dimensions include Requests.state, Requests.assignee_user_id, Requests.customer_id, Requests.customer_owner, Requests.priority, Requests.csat_score, Requests.slack_channel_name, and Requests.collection_id.'
      ),
    filters: z
      .array(externalFilterSchema)
      .optional()
      .default([])
      .describe('Optional filters applied before aggregation.')
  })
  .describe('Cube-style analytics query for ClearFeed request insights.');

export const insightsQuerySchema = z.object({
  query: externalCubeQuerySchema.describe(
    'Insights query payload. Combine measures with time_dimensions, then optionally add dimensions and filters.'
  )
});
