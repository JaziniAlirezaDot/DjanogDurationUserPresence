def manager_duration_presence_user(request):
    second, mint, hour = int(request.GET.get('second')), int(request.GET.get('mint')), int(request.GET.get('hour'))
    print(second, mint, hour)
    if any([second, mint, hour]):
        user = request.user
        new_duration_presence = datetime.time(hour=hour, minute=mint, second=second)
        current_duration_presence = user.duration_presence
        user.duration_presence = plus_datetime_time(new_duration_presence, current_duration_presence)
        user.save()

        return JsonResponse({'data': 'true'}, status=200)
    return JsonResponse({'data': 'false'}, status=500)
